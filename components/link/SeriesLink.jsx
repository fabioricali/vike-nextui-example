import {Link} from "../../renderer/Link.jsx";
import seriesLinkFunc from "./seriesLinkFunc.js";
import PropTypes from "prop-types";
import {usePageContext} from "../../renderer/usePageContext.jsx";
export default function SeriesLink({item, children}) {
    const {pageProps} = usePageContext();
    let finalUrl = seriesLinkFunc({
        pageSlug: pageProps.page.slug,
        seriesDerivatePermalink: item.seriesDerivatePermalink
    })
    return (
        <Link href={finalUrl}>{children}</Link>
    )
}

SeriesLink.propTypes = {
    item: PropTypes.object,
    children: PropTypes.any
}