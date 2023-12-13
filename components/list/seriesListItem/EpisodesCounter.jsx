import {DocumentIcon} from "@heroicons/react/24/outline/index.js";
import SeriesLink from "../../link/SeriesLink.jsx";
import PropTypes from "prop-types";

export default function EpisodesCounter({item, className}) {
    return (
        <div className={'inline leading-4 ' + className}>
            <DocumentIcon className="inline-block text-base text-white w-5 h-5 mr-1.5"/>
            <div className={'inline-block'}>
                <SeriesLink item={item}>
                    <span className="block text-xs --md:text-base font-normal pr-2 w-full sm:w-auto">
                        {item.episodesCount} puntate
                    </span>
                </SeriesLink>
            </div>
        </div>
    )
}

EpisodesCounter.propTypes = {
    className: PropTypes.any,
    item: PropTypes.object
}