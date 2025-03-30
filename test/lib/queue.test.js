import {test} from "../aocTest.js";
import {Queue} from "../../aoc/lib/Queue.js";

// run from ./test directory

const SKIP = true;
console.log('\n>>> Queue Test <<<');

test('queue is created empty', null)
    .resultOf(() => {
        const queue = new Queue();
        return queue.isEmpty();
    })
    .is(true);

test('queue is not empty after write', null)
    .resultOf(() => {
        const queue = new Queue();
        queue.write(1);
        return queue.isEmpty();
    })
    .is(false);

test('queue items are read fifo', null)
        .resultOf(() => {
            const queue = new Queue();
            queue.write(1);
            queue.write(2);
            queue.write(3);
            const i1 = queue.read();
            const i2 = queue.read();
            const i3 = queue.read();
            return i3 === 3 && i2 === 2 && i1 === 1;
        })
        .is(true);

test('queue is empty after reading all items', null)
        .resultOf(() => {
            const queue = new Queue();
            queue.write(1);
            queue.write(2);
            queue.write(3);
            queue.read();
            queue.read();
            queue.read();
            return queue.isEmpty();
        })
        .is(true);

test('peek returns head of queue without removing it', null)
    .resultOf(() => {
        const queue = new Queue();
        queue.write(1);
        queue.write(2);
        queue.write(3);
        const i1 = queue.peek();
        const i1_1 = queue.read();
        return i1 === 1 && i1_1 === 1;
    })
    .is(true);

test('queue toString returns all the elements in order of insertion', null)
    .resultOf(() => {
        const queue = new Queue();
        queue.write('a');
        queue.write('b');
        queue.write('c');
        return queue.toString();
    })
    .is('[a,b,c]');

console.log('');
