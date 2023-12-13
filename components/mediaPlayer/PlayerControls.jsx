import {useEffect, useRef, useState} from 'react'
// import {Link} from "@nextui-org/react";
import {Link} from "../../renderer/Link.jsx";
import {useMediaPlayer} from './MediaProvider.jsx'
import {ForwardButton} from './ForwardButton'
import {MuteButton} from './MuteButton'
import {PlaybackRateButton} from './PlaybackRateButton'
import {PlayButton} from './PlayButton'
import {RewindButton} from './RewindButton'
import {Slider} from './Slider'
import {usePageContext} from "../../renderer/usePageContext.jsx";
import VideoSwitcher from "../../helpers/VideoSwitcher.js";
import VideoFrame from "../episodePlayer/VideoFrame.jsx";
import EpisodeLink from "../link/EpisodeLink.jsx";

function parseTime(seconds) {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds - hours * 3600) / 60)
    seconds = seconds - hours * 3600 - minutes * 60
    return [hours, minutes, seconds]
}

function formatHumanTime(seconds) {
    let [h, m, s] = parseTime(seconds)
    return `${h} hour${h === 1 ? '' : 's'}, ${m} minute${
        m === 1 ? '' : 's'
    }, ${s} second${s === 1 ? '' : 's'}`
}

export function PlayerControls() {
    let player = useMediaPlayer()
    let {pageProps} = usePageContext()
    const videoViewContainerRef = useRef(null);
    const videoViewInstanceRef = useRef(null);

    let wasPlayingRef = useRef(false)

    let [currentTime, setCurrentTime] = useState(player.currentTime)

    useEffect(() => {
        setCurrentTime(null)
    }, [player.currentTime])

    useEffect(() => {
        if (player.episode?.contentType === 'video'
            && player.playerEngineReady
        ) {
            videoViewInstanceRef.current = new VideoSwitcher(player.getPlayerElement(), videoViewContainerRef.current, {
                poster: player.episode.episodeImageUrl || player.episode.videoThumbnails,
                onBeforeCapture() {
                    /*
                    se il file è diverso interrompo il flusso di cattura
                     */
                    // console.log(player.playing, player.isPlaying(episode), player.getPlayerElement().src === episode.fileUrl, player.getPlayerElement().currentSrc, player.getPlayerElement().src)
                    return player.getPlayerElement().src === player.episode.fileUrl;
                }
            });

            if (player.playing) {
                videoViewInstanceRef.current.runCapture();
            }
        }

        return () => {
            if (videoViewInstanceRef.current) {
                // console.log('destroy')
                videoViewInstanceRef.current.destroy();
                videoViewInstanceRef.current = null;
            }
        }
    }, [player.episode, player.playerEngineReady]);

    if (!player.episode) {
        return null
    }

    return (
        <div
            className="relative flex items-center gap-6 bg-black/70 px-4 py-4 shadow shadow-slate-200/80 ring-1 ring-slate-900/5 backdrop-blur-sm md:px-6">
            <div ref={videoViewContainerRef} className={'absolute right-1 -top-48 aspect-video w-80 md:-top-48 md:right-3'}>
                {/*<VideoFrame episode={player.episode} isPrimary={false}/>*/}
            </div>
            <div className="hidden md:flex">
                <img className="h-10 w-10 md:h-14 md:w-14 rounded object-cover"
                     src={player.episode.episodeImageUrl || player.episode.seriesImageUrl || pageProps.page.logo}
                     alt=""/>
            </div>
            <div className="hidden md:block">
                <PlayButton player={player}/>
            </div>
            <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
                <EpisodeLink
                    item={player.episode}
                    className="text-white truncate text-center text-sm font-bold leading-6 md:text-left"
                >
                    {player.episode.episodeTitle || player.episode.originalFileName}
                </EpisodeLink>
                <div className="flex justify-between gap-6">
                    <div className="flex items-center md:hidden">
                        <MuteButton player={player}/>
                    </div>
                    <div className="flex flex-none items-center gap-4">
                        <RewindButton player={player}/>
                        <div className="md:hidden">
                            <PlayButton player={player}/>
                        </div>
                        <ForwardButton player={player}/>
                    </div>
                    <Slider
                        label="Current time"
                        maxValue={player.duration}
                        step={1}
                        value={[currentTime ?? player.currentTime]}
                        onChange={([value]) => setCurrentTime(value)}
                        onChangeEnd={([value]) => {
                            player.seek(value)
                            if (wasPlayingRef.current) {
                                player.play()
                            }
                        }}
                        numberFormatter={{format: formatHumanTime}}
                        onChangeStart={() => {
                            wasPlayingRef.current = player.playing
                            player.pause()
                        }}
                    />
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <PlaybackRateButton player={player}/>
                        </div>
                        <div className="hidden items-center md:flex">
                            <MuteButton player={player}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
