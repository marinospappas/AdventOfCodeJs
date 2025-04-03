export class Stack {
    constructor() {
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        return this.stack.length === 0 ? null : this.stack.pop();
    }

    peek() {
        return this.stack.length === 0 ? null : this.stack[this.stack.length - 1];
    }

    get length() {
        return this.stack.length;
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    contains(item) {
        return this.stack.indexOf(item) >= 0;
    }

    toArray() {
        return this.stack.reverse();
    }

    toString() {
        return '[' + this.stack.reverse().join(',') + ']';
    }
}