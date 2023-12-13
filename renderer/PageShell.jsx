import React from 'react'
import { navigate } from 'vike/client/router'
import PropTypes from 'prop-types'
import './PageShell.css'
import {NextUIProvider} from '@nextui-org/react'
import {PageContextProvider} from './usePageContext'
import {childrenPropType} from './PropTypeValues'
import Navbar from "../components/Navbar2.jsx";
import {PageBackdropProvider} from "../components/pageBackdrop/PageBackdropProvider.jsx";

PageShell.propTypes = {
    pageContext: PropTypes.any,
    children: childrenPropType
}

function PageShell({pageContext, children}) {

    return (
        <React.StrictMode>
            {/* See https://nextui.org/docs/guide/routing */}
            <NextUIProvider navigate={navigate}>
                <PageContextProvider pageContext={pageContext}>
                        <PageBackdropProvider>
                            <Layout>
                                <Navbar/>
                                <Content>{children}</Content>
                            </Layout>
                        </PageBackdropProvider>
                </PageContextProvider>
            </NextUIProvider>
        </React.StrictMode>
    )
}

Layout.propTypes = {
    children: childrenPropType
}

function Layout({children}) {
    return (
        <div className="min-h-screen subpixel-antialiased">
            {children}
        </div>
    )
}

Content.propTypes = {
    children: childrenPropType
}

function Content({children}) {
    return (
        <div className="mx-auto px-0 pt-0 pb-32 sm:px-6 sm:pt-6 lg:px-8">
            {children}
        </div>
    )
}

export {PageShell}
