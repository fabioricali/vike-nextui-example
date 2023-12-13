import ReactDOMServer from 'react-dom/server'
import {PageShell} from './PageShell'
import {escapeInject, dangerouslySkipEscape} from 'vike/server'
import logoUrl from './logo.svg'
import {getPageMetaTags} from "./getPageMetaTags.js";
import {generateHtmlMetaTags} from "./generateHtmlMetaTags.js";
import {initLocale} from "./i18n.js";
async function onRenderHtml(pageContext) {
    const {Page, pageProps, locale} = pageContext
    await initLocale(locale)
    // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
    if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
    const pageHtml = ReactDOMServer.renderToString(
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    )

    // See https://vike.dev/head
    const meta = getPageMetaTags(pageContext);

    //language=html
    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en" class="h-full bg-gray-100">
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="${logoUrl}"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        ${dangerouslySkipEscape(generateHtmlMetaTags(meta))}
        <link
            rel="preconnect"
            href="https://cdn.fontshare.com"
            crossOrigin="anonymous"
        />
        <link
            rel="stylesheet"
            href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
        <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
    </head>
    <body class="h-full">
    <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
    <div id="page-loader" class="hide">
        <div class="loader"></div>
    </div>
    </body>
    </html>`

    return {
        documentHtml,
        pageContext: {
            // hostname: 'a'
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
        }
    }
}

// export {onRenderHtml}
// export const passToClient = ['pageProps', 'urlPathname', 'documentProps', 'acceptsLanguages']

// See https://vike.dev/data-fetching
export default onRenderHtml
    // passToClient: ['pageProps', 'urlPathname', 'documentProps', 'acceptsLanguages']