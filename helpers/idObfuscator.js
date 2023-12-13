export const FACTOR = 32984;

export const encrypt = function (id) {
    return id * FACTOR;
}

export const decrypt = function (id) {
    return id / FACTOR;
}