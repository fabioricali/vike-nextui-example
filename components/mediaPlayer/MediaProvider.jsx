import {createContext, useContext, useEffect, useMemo, useReducer, useRef} from 'react'
import {usePageContext} from "../../renderer/usePageContext.jsx";
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads/dist/videojs-contrib-ads.css';
import 'videojs-ima/dist/videojs.ima.css';
import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';
import PropTypes from "prop-types";

const EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX = 'episodeLastTime';

function findEpisodeIndex(episodes, fileUrl) {
    return episodes.findIndex((episode) => episode.fileUrl === fileUrl);
}

const ActionKind = {
    SET_META: 'SET_META',
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    TOGGLE_MUTE: 'TOGGLE_MUTE',
    SET_CURRENT_TIME: 'SET_CURRENT_TIME',
    SET_DURATION: 'SET_DURATION',
    PLAYER_ENGINE_READY: 'PLAYER_ENGINE_READY',
    LOADING: 'LOADING'
}

const MediaPlayerContext = createContext(null)

function mediaReducer(state, action) {
    switch (action.type) {
        case ActionKind.SET_META:
            return {...state, episode: action.payload}
        case ActionKind.PLAY:
            return {...state, playing: true}
        case ActionKind.PAUSE:
            return {...state, playing: false}
        case ActionKind.TOGGLE_MUTE:
            return {...state, muted: action.payload}
        case ActionKind.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case ActionKind.SET_DURATION:
            return {...state, duration: action.payload}
        case ActionKind.PLAYER_ENGINE_READY:
            return {...state, playerEngineReady: true}
        case ActionKind.LOADING:
            return {...state, loading: action.payload}
    }
}

export function MediaProvider({children}) {
    let [state, dispatch] = useReducer(mediaReducer, {
        playing: false,
        loading: false,
        muted: false,
        duration: 0,
        currentTime: 0,
        episode: null,
        playerEngineReady: false,
        playerElement: null,
    })

    let playerContainerRef = useRef(null)
    let playerElementRef = useRef(null)
    let playerRef = useRef(null)

    let {pageProps} = usePageContext()
    let actions = useMemo(() => {
        return {
            resumePlay() {
                playerRef.current.reset();
                setTimeout(() => {
                    this.play(playerRef.current.episode);
                })
            },
            getLocalLastCurrentTime(episode) {
                if (episode) {
                    const lastCurrentTime = EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX + (episode.id || episode.episodeId);
                    const lastCurrentTimeFound = localStorage.getItem(lastCurrentTime);
                    if (lastCurrentTimeFound) {
                        playerRef.current.currentTime(lastCurrentTimeFound)
                    } else {
                        playerRef.current.currentTime(0);
                    }
                }
            },
            setLocalLastCurrentTime(episode, currentTime) {
                if (currentTime === undefined) return;
                localStorage.setItem(EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX + episode.id || episode.episodeId, currentTime);
            },
            deleteLocalLastCurrentTime(episode) {
                localStorage.removeItem(EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX + episode.id || episode.episodeId);
            },
            play(episode) {
                if (episode) {
                    dispatch({type: ActionKind.SET_META, payload: episode})
                    if (
                        playerRef.current &&
                        playerRef.current.currentSrc() !== episode.fileUrl
                    ) {
                        let playbackRate = playerRef.current.playbackRate()
                        playerRef.current.episode = episode;
                        playerRef.current.src(episode.fileUrl)
                        playerRef.current.load()
                        playerRef.current.pause()
                        playerRef.current.playbackRate(playbackRate)
                        this.getLocalLastCurrentTime(episode);
                    }
                }
                // console.log(playerRef.current)
                playerRef.current?.play()
            },
            prev() {
                if (!pageProps.onDemandEpisodes) return;
                let currentIndex = findEpisodeIndex(pageProps.onDemandEpisodes, playerRef.current.src());
                if (currentIndex > -1) {
                    let prevEpisode = pageProps.onDemandEpisodes[--currentIndex];
                    if (prevEpisode) {
                        actions.play(prevEpisode)
                    }
                }
            },
            next() {
                if (!pageProps.onDemandEpisodes) return;
                let currentIndex = findEpisodeIndex(pageProps.onDemandEpisodes, playerRef.current.src());
                if (currentIndex > -1) {
                    let nextEpisode = pageProps.onDemandEpisodes[++currentIndex];
                    if (nextEpisode) {
                        actions.play(nextEpisode)
                    }
                }
            },
            moveDomElementAt(newParentElement) {
                this.getPlayerElement()._orginalParentElement = this.getPlayerWrapperElement().parentElement;
                newParentElement.appendChild(this.getPlayerWrapperElement());
            },
            resetDomElementAt() {
                if (this.getPlayerElement()._orginalParentElement) {
                    this.getPlayerElement()._orginalParentElement.appendChild(this.getPlayerWrapperElement());
                }
            },
            poster(imageUrl) {
                playerRef.current.poster(imageUrl);
            },
            pause() {
                playerRef.current?.pause()
            },
            toggle(episode) {
                this.isPlaying(episode) ? actions.pause() : actions.play(episode)
            },
            seekBy(amount) {
                if (playerRef.current) {
                    playerRef.current.currentTime(playerRef.current.currentTime() + amount)
                }
            },
            seek(time) {
                if (playerRef.current) {
                    playerRef.current.currentTime(time)
                }
            },
            playbackRate(rate) {
                if (playerRef.current) {
                    playerRef.current.playbackRate(rate)
                }
            },
            toggleMute() {
                const muted = !playerRef.current.muted();
                dispatch({
                    type: ActionKind.TOGGLE_MUTE,
                    payload: muted
                })
                playerRef.current.muted(muted)
            },
            isPlaying(episode) {
                return episode
                    ? state.playing && this.isCurrent(episode)
                    : state.playing
            },
            isCurrent(episode) {
                return playerRef.current?.currentSrc() === episode.fileUrl
            },
            isEmpty() {
                return playerRef.current?.currentSrc() === ''
            },
            getPlayerElement() {
                return playerElementRef.current;
            },
            getPlayerWrapperElement() {
                return playerElementRef.current.parentElement;
            }
        }
    }, [state.playing])

    // create videojs instance
    useEffect(() => {
        if (!playerRef.current) {
            const videoJsElement = playerElementRef.current = document.createElement('video');
            //videoJsElement.setAttribute('controls', '');
            videoJsElement.setAttribute('class', 'video-js vjs-fluid');
            playerContainerRef.current.appendChild(videoJsElement);
            const videoJsInstance = videojs(videoJsElement, {
                loadingSpinner: false,
                //controlBar: false
            }, () => {
                dispatch({type: ActionKind.PLAYER_ENGINE_READY});

                //IMA plugin
                // Questo implementa il vast, per il momento disattivo.. Stranamente dopo la riproduzione della pubblicità l'eventuale seek non funziona e riparte la prima volta da zero.
                // if (pageProps.page?.adTagUrl) {
                //     let options = {
                //         adTagUrl: pageProps.page.adTagUrl,
                //         autoplay: true,
                //         adsManagerLoadedCallback() {
                //             console.log('adsManagerLoadedCallback')
                //             videoJsInstance.ima.addEventListener(google.ima.AdEvent.Type.STARTED, () => {
                //                 console.log(google.ima.AdEvent.Type.STARTED)
                //             });
                //             videoJsInstance.ima.addEventListener(google.ima.AdEvent.Type.COMPLETE, () => {
                //                 console.log(google.ima.AdEvent.Type.COMPLETE)
                //             });
                //         }
                //         // loop: true
                //     };
                //     videoJsInstance.ima(options);
                // }

            });
            videoJsInstance.on('play', () => {
                dispatch({type: ActionKind.PLAY});
            });
            videoJsInstance.on('pause', () => dispatch({type: ActionKind.PAUSE}));
            videoJsInstance.on('timeupdate', () => {
                const currentTime = playerRef.current.currentTime();
                dispatch({
                    type: ActionKind.SET_CURRENT_TIME,
                    payload: Math.floor(currentTime),
                });
                actions.setLocalLastCurrentTime(playerRef.current.episode, currentTime);
            });
            videoJsInstance.on('durationchange', () => dispatch({
                type: ActionKind.SET_DURATION,
                payload: Math.floor(playerRef.current.duration()),
            }));
            videoJsInstance.on('ended', () => {
                actions.deleteLocalLastCurrentTime(playerRef.current.episode)
                actions.next();
            });
            videoJsInstance.on('seeking', () => dispatch({type: ActionKind.LOADING, payload: true}));
            videoJsInstance.on('seeked', () => dispatch({type: ActionKind.LOADING, payload: false}));
            videoJsInstance.on('waiting', () => dispatch({type: ActionKind.LOADING, payload: true}));
            videoJsInstance.on('stalled', () => dispatch({type: ActionKind.LOADING, payload: true}));
            videoJsInstance.on('canplaythrough', () => dispatch({type: ActionKind.LOADING, payload: false}));
            videoJsInstance.on('playing', () => dispatch({type: ActionKind.LOADING, payload: false}));
            videoJsInstance.on('error', (e) => {
                console.log('error', e, videoJsInstance)
                actions.resumePlay()
            });
            // videoJsInstance.on('suspend', (e) => console.log('suspend', e));
            // videoJsInstance.on('abort', (e) => console.log('abort', e));
            // console.log(pageProps)

            // videoJsInstance.on('ads-ad-started', () => {
            //     console.log('ads-ad-started')
            // });




            playerRef.current = videoJsInstance;
        }

    }, [playerContainerRef])

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    useEffect(() => {
        // console.log('pageProps.episode', pageProps.episode)
    }, [pageProps?.episode])

    let api = useMemo(() => ({...state, ...actions}), [state, actions])

    return (
        <>
            <MediaPlayerContext.Provider value={api}>
                {children}
            </MediaPlayerContext.Provider>
            <div className={'hidden'} ref={playerContainerRef}></div>
        </>
    )
}

export function useMediaPlayer(episode) {
    let player = useContext(MediaPlayerContext)

    return useMemo(
        () => ({
            ...player,
            play() {
                player.play(episode)
            },
            toggle() {
                player.toggle(episode)
            },
            get playing() {
                return player.isPlaying(episode)
            },
            get loading() {
                return player.loading && player.isPlaying(episode)
            },
        }),
        [player, episode],
    )
}

MediaProvider.propTypes = {
    children: PropTypes.any
}