import {getPage, getSeries} from "../../api.js";
export async function onBeforeRender(pageContext) {


    const pageProps = {

    };

    // We make `pageProps` available as `pageContext.pageProps`
    return {
        pageContext: {
            pageProps
        }
    };
}

// By default, `pageContext` is available only on the server. But our hydrate function
// we defined earlier runs in the browser and needs `pageContext.pageProps`; we use
// `passToClient` to tell `vike` to serialize and make `pageContext.pageProps`
// available to the browser.
export default{
    passToClient: ['pageProps', 'documentProps']
}