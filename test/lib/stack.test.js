import {test} from "../aocTest.js";
import {Stack} from "../../aoc/lib/Stack.js";

// run from ./test directory

const SKIP = true;
console.log('\n>>> Stack Test <<<');


test('new stack is empty', null)
    .resultOf(() => {
        const stack = new Stack();
        return stack.isEmpty();
    })
    .is(true);

test('stack is not empty after push', null)
    .resultOf(() => {
        const stack = new Stack();
        stack.push(1);
        return stack.isEmpty();
    })
    .is(false);

test('stack items are popped lifo', null)
    .resultOf(() => {
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        const i3 = stack.pop();
        const i2 = stack.pop();
        const i1 = stack.pop();
        return i3 === 3 && i2 === 2 && i1 === 1;
    })
    .is(true);

test('stack is empty after popping all items', null)
    .resultOf(() => {
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.pop();
        stack.pop();
        stack.pop();
        return stack.isEmpty();
    })
    .is(true);

test('peek returns top of stack without removing it', null)
    .resultOf(() => {
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        const i3 = stack.peek();
        const len3 = stack.length;
        const i3_3 = stack.pop();
        return i3 === 3 && i3_3 === 3 && len3 === 3;
    })
    .is(true);

test('length of stack is reduced after pop', null)
    .resultOf(() => {
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        const len3 = stack.length;
        stack.pop();
        const len2 = stack.length;
        stack.pop();
        const len1 = stack.length;
        stack.pop();
        const len0 = stack.length;
        return len3 === 3 && len2 === 2 && len1 === 1 && len0 === 0;
    })
    .is(true);

test('stack toString returns all the elements in order of insertion', null)
    .resultOf(() => {
        const stack = new Stack();
        stack.push('a');
        stack.push('b');
        stack.push('c');
        return stack.toString();
    })
    .is('[a,b,c]');

console.log('');
