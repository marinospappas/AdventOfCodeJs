// array utils

export class AocArray {

    static count(array, item) {
        return array.reduce((acc, curr) => (curr === item) ? acc + 1 : acc, 0);
    }
    
    static sum(array) {
        return array.reduce((acc, curr) => acc + curr, 0);
    }

    static contains(array, element) {
        return array.indexOf(element) >= 0
    }

    static sliding(array, windowSize, step) {
        if (windowSize > array.length) return [];
        const result = [];
        if (step === undefined) step = windowSize;
        for (let i = 0; i <= array.length; i += step) {
            result.push(array.slice(i, i + windowSize));
        }
        return result;
    }

    static fromString(str, step) {
        if (step === undefined) step = 1;
            const result = [];
        for (let i = 0; i <= str.length; i += step) {
            if (i + step > str.length) break;
            const element = step === 2 ? str[i] + str[i+1] : str.substring(i, i + step);
            result.push(element);
        }
        return result;
    }
}
