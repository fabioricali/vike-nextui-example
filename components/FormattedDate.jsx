import PropTypes from "prop-types";
import {DateTime} from "luxon";

// const dateFormatter = new Intl.DateTimeFormat('', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric'
// })

function dateFormatter(date, locale) {
    return DateTime.fromJSDate(date).setLocale(locale).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
}
export function FormattedDate({date, ...props}) {
    if (typeof date === 'string')
        date = new Date(date)
    return (
        <time dateTime={date.toISOString()} {...props}>
            {dateFormatter(date, 'it')}
        </time>
    )
}

FormattedDate.propTypes = {
    date: PropTypes.any
}
