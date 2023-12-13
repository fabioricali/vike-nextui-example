import SeriesLink from "../../link/SeriesLink.jsx";
import {Image} from "@nextui-org/react";
import PropTypes from "prop-types";

export default function SeriesListItem2({item, routeParams}) {
    return (
        <div className="flex items-center">
            <div
                className="mr-4 aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-large sm:aspect-none sm:h-20 sm:w-20">
                <SeriesLink item={item}>
                <Image loading={'lazy'} src={item.imageUrl} alt={item.title} className="h-full w-full object-cover object-center sm:h-full sm:w-full"/>
                </SeriesLink>
            </div>
            <SeriesLink item={item}>
                <h3 className="inline-block font-medium text-base">
                    {item.title || '-'}
                </h3>
            </SeriesLink>
        </div>
    )
}

SeriesListItem2.propTypes = {
    item: PropTypes.object,
    routeParams: PropTypes.object
}