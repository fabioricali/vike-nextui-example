import {useMediaPlayer} from '../mediaPlayer/MediaProvider.jsx'
import * as PropTypes from "prop-types";
import {Button} from "@nextui-org/react";
import {PauseIcon} from "../icons/PauseIcon.jsx";
import {PlayIcon} from "../icons/PlayIcon.jsx";

export function EpisodePlayButton({episode, size = 'sm', className = ''}) {
    let player = useMediaPlayer(episode)

    return (
        <Button
            onPress={() => {
                player.toggle()
            }}
            aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
                episode.episodeTitle || episode.originalFileName
            }`}
            isLoading={player.loading}
            variant={'bordered'}
            size={size}
            radius={'full'}
            isIconOnly
            className={'border-amber-500/30 text-amber-500 ' + className}
        >
            {player.loading
                ? ''
                : player.playing
                    ? <PauseIcon className="m-2 fill-current"/>
                    : <PlayIcon className="m-2 fill-current"/>}
        </Button>
    )
}

EpisodePlayButton.propTypes = {
    episode: PropTypes.object,
    size: PropTypes.string,
    className: PropTypes.any,
}