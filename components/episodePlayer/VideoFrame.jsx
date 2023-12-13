import {useMediaPlayer} from "../mediaPlayer/MediaProvider.jsx";
// import VideoSwitcher from "../../helpers/VideoSwitcher.js";
import {EpisodePlayButton} from "../buttons/EpisodePlayButton.jsx";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";

export default function VideoFrame ({episode, isPrimary}) {
    let player = useMediaPlayer(episode);
    const [canShowPlayerButton, setCanShowPlayerButton] = useState(true);
    const [canShowPoster, setCanShowPoster] = useState(true);
    const [canBeVisible, setCanBeVisible] = useState(false);
    const videoViewContainerRef = useRef(null);
    const playButtonRef = useRef(null);

    //https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
    useLayoutEffect(() => {
        if (episode?.contentType === 'video'
            && player.playerEngineReady
        ) {
            window._videoViewCollisions = window._videoViewCollisions || {};
            if (window._videoViewCollisions[episode.fileUrl]) return ;
            player.moveDomElementAt(videoViewContainerRef.current);
            window._videoViewCollisions[episode.fileUrl] = true;
            setCanBeVisible(true);
        }

        return () => {
            if (window._videoViewCollisions) {
                delete window._videoViewCollisions[episode.fileUrl];
            }
            player.resetDomElementAt();
        }
    }, [episode, player.playerEngineReady])

    useEffect(() => {

        if (!player.playing && (player.isEmpty() || !player.isCurrent(episode))) {
            setCanShowPoster(true)
        } else {
            setCanShowPoster(false)
        }

        if (player.playing) {
            //auto hide after 3 seconds
            setTimeout(() => {
                player.playing && setCanShowPlayerButton(false)
            }, 3000);
        } else {
            setCanShowPlayerButton(true)
        }
    }, [episode, player.playing, player.episode]);

    return (
        <div ref={videoViewContainerRef} className={`relative ${canBeVisible ? '' : 'hidden'}`}
             onClick={() => player.toggle()}
             onMouseEnter={() => setCanShowPlayerButton(true)}
             onMouseMove={() => setCanShowPlayerButton(true)}
             onMouseLeave={() => player.playing && setCanShowPlayerButton(false)}>
            {canShowPoster && (<div className={'bg-black absolute w-full h-full z-10'} style={{
                backgroundImage: `url("${episode.episodeImageUrl}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'none'
            }}></div>)}
            <div ref={playButtonRef}
                 className={`${canShowPlayerButton ? 'opacity-100' : 'opacity-0' } z-10 transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150`}>
                <EpisodePlayButton
                    episode={episode}
                    size={'lg'}
                    className={'border-white-500/30 text-white-500 bg-black/60'}
                />
            </div>
        </div>
    )
}

VideoFrame.propTypes = {
    episode: PropTypes.object,
    isPrimary: PropTypes.bool
}