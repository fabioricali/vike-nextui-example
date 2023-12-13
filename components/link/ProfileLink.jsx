import {Link} from "../../renderer/Link.jsx";
import PropTypes from "prop-types";

export default function ProfileLink({config, children}) {
    let finalUrl = `/${config.pageSlug}`
    return (
        <Link href={finalUrl}>{children}</Link>
    )
}

ProfileLink.propTypes = {
    config: PropTypes.object,
    children: PropTypes.any
}