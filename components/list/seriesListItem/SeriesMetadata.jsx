import EpisodesCounter from "./EpisodesCounter.jsx";
import SeriesCategories from "./SeriesCategories.jsx";
import PropTypes from "prop-types";

export default function SeriesMetadata ({item}) {
    return (
        <div className={'space-x-3'}>
            <EpisodesCounter item={item}/>
            <SeriesCategories item={item}/>
        </div>
    )
}

SeriesMetadata.propTypes = {
    item: PropTypes.object
}