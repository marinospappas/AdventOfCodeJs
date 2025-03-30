export class Queue {
    constructor() {
        this.head = null;
        this.tail = this.head;
    }

    write(item) {
        if (this.tail === null) {
            this.tail = {data: item, next: null};
            this.head = this.tail;
        } else {
            this.tail.next = {data: item, next: null};
            this.tail = this.tail.next;
        }
    }

    read() {
        if (this.head === null)
            return null;
        const item = this.head.data;
        this.head = this.head.next;
        return item;
    }

    peek() {
        return this.head.data;
    }

    isEmpty() {
        return this.head === null;
    }

    toString() {
        let qArray = [];
        let q = this.head;
        while(q !== null) {
            qArray.push(q.data);
            q = q.next
        }
        return '[' + qArray.join(',') + ']';
    }
}