class Rcn {
    constructor(classList) {
        this.className = classList.join(' ');
    }

    toString() {
        return this.className;
    }
}

function pushClass(result, candidate) { // eslint-disable-line complexity
    if (!candidate) {
        return result;
    }

    const candidateType = typeof candidate;

    if (Array.isArray(candidate)) {
        return pushClassArray(result, candidate);
    }

    if (candidateType === 'object') {
        return pushClassObject(result, candidate);
    }

    if (candidateType === 'string' || candidateType === 'number') {
        return pushClassString(result, candidate);
    }

    return result;
}

function pushClassObject(result, object) {
    for (const key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
            result.push(key);
        }
    }

    return result;
}

function pushClassString(result, string) {
    result.push(string);
    return result;
}

function pushClassArray(result, array) {
    let ii = 0;
    const {length} = array;

    for (; ii < length; ii += 1) {
        pushClass(result, array[ii]);
    }

    return result;
}

function classNames() {
    const result = [];
    const {length} = arguments;
    let ii = 0;

    for (; ii < length; ii += 1) {
        pushClass(result, arguments[ii]);
    }

    return new Rcn(result);
}

module.exports = classNames;
