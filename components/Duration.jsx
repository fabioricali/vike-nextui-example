import prettyMilliseconds from 'pretty-ms';
import * as PropTypes from "prop-types";

export function Duration({milliseconds, ...props}) {
    milliseconds = prettyMilliseconds(milliseconds, {compact: true});
    milliseconds = milliseconds.replace('s', ' sec');
    milliseconds = milliseconds.replace('m', ' min');
    milliseconds = milliseconds.replace('h', ' hour');
    return (
        <span {...props}>
            {milliseconds}
        </span>
    )
}

Duration.propTypes = {
    seconds: PropTypes.number
}