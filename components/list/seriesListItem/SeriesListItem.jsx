import SeriesLink from "../../link/SeriesLink.jsx";
import {Button, Image} from "@nextui-org/react";
import PropTypes from "prop-types";
import {navigate} from "vike/client/router";
import SeriesMetadata from "./SeriesMetadata.jsx";
import {usePageContext} from "../../../renderer/usePageContext.jsx";
import seriesLinkFunc from "../../link/seriesLinkFunc.js";

export default function SeriesListItem({item}) {
    const {pageProps} = usePageContext();
    let toEpisodesUrl = seriesLinkFunc({
        pageSlug: pageProps.page.slug,
        seriesDerivatePermalink: item.seriesDerivatePermalink
    })
    return (
        <div key={item.id}
             className="border-white/30 flex border-b-1 pb-6 sm:p-6 sm:shadow-sm sm:rounded-large sm:border lg:col-span-2">
            <SeriesLink item={item}>
                <div
                    className="aspect-h-1 aspect-w-1 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                    <Image loading={'lazy'} src={item.imageUrl} alt={item.title}
                           className="h-full w-full object-cover object-center"/>
                </div>
            </SeriesLink>
            <div className="flex flex-col sm:justify-between ml-6 mt-0 w-full">
                <div className="mb-2 sm:mb-0">
                    <SeriesLink item={item}>
                        <h2 className="inline-block text-base sm:text-xl sm:font-medium">
                            {item.title || '-'}
                        </h2>
                    </SeriesLink>
                    <p className="hidden sm:block mt-2 text-small font-light text-gray-300 mb-3">{item.shortDescription || item.description}</p>
                </div>
                <div className="flex flex-wrap items-center space-y-3">
                    <SeriesMetadata item={item}/>
                    <div className="ml-auto hidden sm:block">
                        <Button color={'warning'} onClick={() => navigate(toEpisodesUrl)}>
                            Ascolta
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

SeriesListItem.propTypes = {
    item: PropTypes.object
}