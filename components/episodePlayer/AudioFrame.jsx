import {EpisodePlayButton} from "../buttons/EpisodePlayButton.jsx";
import {WaveForm} from "./WaveForm.jsx";
import * as PropTypes from "prop-types";

export default function AudioFrame ({episode}) {
    return (
        <div className="flex items-center mt-6 sm:mt-0 space-x-4">
            <EpisodePlayButton
                episode={episode}
                size={'lg'}
            />
            <div className="flex-1 flex-shrink-0">
                <WaveForm episode={episode}/>
            </div>
        </div>
    )
}

AudioFrame.propTypes = {
    episode: PropTypes.object
}