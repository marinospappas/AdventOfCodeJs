// array utils

export class AocArray {

    static count(array, item) {
        return array.reduce((acc, curr) => (curr === item) ? acc + 1 : acc, 0);
    }
    
    static sum(array) {
        return array.reduce((acc, curr) => acc + curr, 0);
    }
}
