import PropTypes from 'prop-types'
import {usePageContext} from './usePageContext'

Link.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string.isRequired
}

function Link(props) {
    const pageContext = usePageContext()
    const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')
    return (
        <a {...props} className={className + ' transition duration-300 _text-white _hover:text-yellow-500 _bg-yellow-300'}/>
    )
}

export {Link}