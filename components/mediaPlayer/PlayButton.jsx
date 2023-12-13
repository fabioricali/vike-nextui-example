import {PauseIcon} from '../icons/PauseIcon.jsx'
import {PlayIcon} from '../icons/PlayIcon.jsx'
import PropTypes from "prop-types";
import {Button} from "@nextui-org/react";

export function PlayButton({player}) {
    let Icon = player.playing ? PauseIcon : PlayIcon

    return (
        <Button
            className="group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/70 transition hover:scale-110 active:scale-90 -focus:outline-none -focus:ring-2 -focus:ring-slate-700 -focus:ring-offset-2 md:h-14 md:w-14"
            onPress={() => player.toggle()}
            aria-label={player.playing ? 'Pause' : 'Play'}
            isIconOnly
            isLoading={player.loading}
        >
            {!player.loading && (
                <>
                    <div className="absolute -inset-3 md:hidden"/>
                    <Icon className="h-5 w-5 fill-black md:h-7 md:w-7"/>
                </>
            )}
        </Button>
    )
}

PlayButton.propTypes = {
    player: PropTypes.object
}
