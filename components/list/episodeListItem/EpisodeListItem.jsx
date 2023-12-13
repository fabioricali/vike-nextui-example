import EpisodeLink from "../../link/EpisodeLink.jsx";
import {FormattedDate} from "../../FormattedDate.jsx";
import {EpisodePlayButton} from "../../buttons/EpisodePlayButton.jsx";
import {Duration} from "../../Duration.jsx";
import {Image} from "@nextui-org/react";
import * as PropTypes from "prop-types";

export default function EpisodeListItem({episode, pos, page}) {
    return(
        // border-gray-200 bg-white sm:shadow-sm sm:rounded-lg sm:border pb-6 sm:pb-0 border-b-1
        <div
            className="flex items-center border-white/30 border-b-1 pb-6 sm:p-6 sm:shadow-sm sm:rounded-large sm:border">
            {/*<div className="flex-shrink-0 hidden mr-6 text-center font-bold sm:block">*/}
            {/*    <EpisodePlayButton episode={episode}/>*/}
            {/*</div>*/}
            <div className="flex-shrink-0 mr-6">
                <EpisodeLink item={episode}>
                    <Image loading={'lazy'} className="h-12 w-12 sm:h-24 sm:w-24 border-1 border-white/30 object-cover"
                         src={episode.episodeImageUrl || episode.seriesImageUrl || page.logo}
                         alt={episode.episodeTitle || episode.originalFileName}/>
                </EpisodeLink>
            </div>
            <div className="flex-1 mr-6">
                <EpisodeLink item={episode}>
                    {/*<span className="absolute inset-0" aria-hidden="true"/>*/}
                    <h2 className="font-medium text-sm">{episode.episodeTitle || episode.originalFileName}</h2>
                </EpisodeLink>
                <p className="truncate text-sm text-white">
                    <FormattedDate
                        date={episode.createdOn}
                        className="order-first text-sm leading-7 text-slate-300"
                    />
                </p>
                <div className="flex items-center gap-4 text-white text-sm" title={'Episodio numero ' + pos}>
                    Episodio #{pos}
                </div>
            </div>
            <div>
                <EpisodePlayButton episode={episode}/>
                <div className="text-xs text-white font-bold mt-4">
                    <Duration milliseconds={episode.duration}/>
                </div>
            </div>
        </div>
    )
}

EpisodeListItem.propTypes = {
    episode: PropTypes.object,
    pos: PropTypes.number,
    routeParams: PropTypes.object,
    page: PropTypes.object
}