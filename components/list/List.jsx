import PropTypes from "prop-types";

export default function List({ children }) {
    return (
        <ul className="grid gap-x-8 gap-y-6 sm:gap-y-4 p-6 sm:p-0">
            {children}
        </ul>
    )
}

List.propTypes = {
    children: PropTypes.array
}
