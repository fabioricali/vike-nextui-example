import {BookmarkIcon} from "@heroicons/react/24/outline/index.js";
import {Link} from "../../../renderer/Link.jsx";
import PropTypes from "prop-types";

export default function SeriesCategories({item, className}) {
    if (!item || !item.categories.length)
        return null;

    return (
        <div className={'inline leading-4 ' + className}>
            <BookmarkIcon className="inline-block text-base text-white w-5 h-5 mr-1.5"/>
            {item.categories.map((category, i, t) => (
                <div key={i} className="inline-block">
                    <Link href={'/series/category/' + category}>
                        <span className="block text-xs --md:text-base font-normal pr-1 w-full sm:w-auto">
                            <span>{category}</span>
                            {i < t.length - 1 && (<span>,&nbsp;</span>)}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    )
}

SeriesCategories.propTypes = {
    className: PropTypes.any,
    item: PropTypes.object
}