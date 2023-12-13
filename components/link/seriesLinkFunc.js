import {PERMALINK_BASE_PLACEHOLDER} from "../../consts.js";

export default function seriesLinkFunc (config) {
    return config.seriesDerivatePermalink.replace(PERMALINK_BASE_PLACEHOLDER, '/' + config.pageSlug);
}