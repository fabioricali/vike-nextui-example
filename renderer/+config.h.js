export default {
    // passToClient: ['pageProps', 'urlPathname', 'documentProps', 'acceptsLanguages', 'locale'],
    passToClient: ['pageProps', 'documentProps', 'acceptsLanguages', 'locale'],
    clientRouting: true,
    hydrationCanBeAborted: true,
    prefetchStaticAssets: 'viewport'
}