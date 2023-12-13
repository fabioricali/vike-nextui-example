export const humanDuration = function (ms) {
    if (Number.isInteger(ms)) {
        let res = Math.round(ms / 1000 / 60);
        return res + ' min'
    } else {
        return ms;
    }
}
