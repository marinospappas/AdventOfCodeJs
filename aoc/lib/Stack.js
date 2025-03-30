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

    toString() {
        return '[' + this.stack.join(',') + ']';
    }
}