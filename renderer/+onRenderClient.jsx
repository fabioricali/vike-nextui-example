import {hydrateRoot, createRoot} from 'react-dom/client'
import {PageShell} from './PageShell'

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA

let root;
async function onRenderClient(pageContext) {
    const {Page, pageProps, isHydration, locale} = pageContext
    if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined')

    const page = (
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    )

    const container = document.getElementById('page-view')
    // if (!root) throw new Error('DOM element #react-root not found')
    //

    if (isHydration) {
        root = hydrateRoot(
            container,
            page
        )
    } else {
        if (!root) {
            root = createRoot(
                container
            )
        }
        root.render(page)
    }
}

function onHydrationEnd() {
    console.log('Hydration finished; page is now interactive.')
}

function onPageTransitionStart() {
    // console.log('Page transition start')
    document.getElementById('page-loader').classList.remove('hide')
}

function onPageTransitionEnd() {
    // console.log('Page transition end')
    document.getElementById('page-loader').classList.add('hide')
}

// export default onRenderClient
export {onRenderClient}
export {onHydrationEnd}
export {onPageTransitionStart}
export {onPageTransitionEnd}
// export const clientRouting = true;
// export const hydrationCanBeAborted = true;
//
// // Prefetch links as soon as they enter the viewport
// export const prefetchStaticAssets = 'viewport'

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vike.dev/clientRouting */
