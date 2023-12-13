import * as PropTypes from "prop-types";
import VideoFrame from "./VideoFrame.jsx";
import AudioFrame from "./AudioFrame.jsx";
import {useEffect, useState} from "react";

export function EpisodePlayer({episode}) {
    const [canShowVideoFrame, setCanShowVideoFrame] = useState(false);

    useEffect(() => {
        setCanShowVideoFrame(true);
    }, []);

    if (episode.contentType === 'video') {
        if (canShowVideoFrame) {
            return (
                <VideoFrame episode={episode} isPrimary={true}/>
            )
        } else {
            return null;
        }
    } else {
        return (
            <AudioFrame episode={episode}/>
        )
    }
}

EpisodePlayer.propTypes = {
    episode: PropTypes.object
}