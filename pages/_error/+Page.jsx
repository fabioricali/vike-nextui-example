import PropTypes from 'prop-types'
import {usePageContext} from "../../renderer/usePageContext.jsx";
import {FaceFrownIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline/index.js";

function Page({is404}) {
    const {abortStatusCode, abortReason} = usePageContext()
    if (abortStatusCode === 404 || is404) {
        return (
            <div className={'text-center p-12 sm:p-4'}>
                <FaceFrownIcon className={'w-64 m-auto mb-4 text-yellow-500'}/>
                <h1 className={'font-bold text-5xl'}>404</h1>
                <h2 className={'mb-2 text-yellow-500'}>Page not found</h2>
                <p>{abortReason || 'This page could not be found.'}</p>
            </div>
        )
    } else {
        return (
            <div className={'text-center p-12 sm:p-4'}>
                <ExclamationTriangleIcon className={'w-64 m-auto mb-4 text-red-400'}/>
                <h1 className={'font-bold text-5xl'}>500</h1>
                <h2 className={'mb-2 text-red-400'}>Internal error</h2>
                <p>{abortReason || 'Something went wrong.'}</p>
            </div>
        )
    }
}

Page.propTypes = {
    is404: PropTypes.bool
}

export default Page