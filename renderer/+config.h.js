// import {
//     onHydrationEnd, onPageTransitionEnd,
//     onPageTransitionStart
// } from "../dist/client/assets/entries/renderer_default.page.client.fd21443c.js";

export default {
    // passToClient: ['pageProps', 'urlPathname', 'documentProps', 'acceptsLanguages', 'locale'],
    passToClient: ['pageProps', 'documentProps', 'acceptsLanguages', 'locale'],
    clientRouting: true,
    hydrationCanBeAborted: true,
    prefetchStaticAssets: 'viewport'
}