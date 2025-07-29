export class Deque {
  constructor() {
    this.items = [];
  }

  // Add to the front
  addFront(element) {
    this.items.unshift(element);
  }
  add(element) {
    this.addFront(element);
  }

  // Add to the rear
  addRear(element) {
    this.items.push(element);
  }

  // Remove from the front
  removeFront() {
    return this.items.shift();
  }

  // Remove from the rear
  removeRear() {
    return this.items.pop();
  }
  poll() {
    return this.removeRear();
  }

  // Check if the deque is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get the size of the deque
  size() {
    return this.items.length;
  }

  // Peek at the front
  peekFront() {
    return this.items[0];
  }

  // Peek at the rear
  peekRear() {
    return this.items[this.items.length - 1];
  }
}
