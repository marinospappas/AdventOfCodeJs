export class Queue {
    constructor() {
        //todo: empty queue must be head = null
        this.head = {data: null, next: null}
        this.tail = this.head;
    }

    write(item) {
        if (this.tail.data === null) {
            this.tail.data = item;
        } else {
            this.tail.next = {data: item, next: null};
            this.tail = this.tail.next;
        }
    }

    read() {
        const item = this.head.data;
        this.head = this.head.next;
        return item;
    }

    peek() {
        return this.head.data;
    }

    isEmpty() {
        return this.head.data === null;
    }

    toString() {
        let qArray = [];
        let q = this.head;
        let item = '';
        while(item !== null && q !== null) {
            item = q.data;
            qArray.push(item);
            q = q.next
        }
        return '[' + qArray.join(',') + ']';
    }
}