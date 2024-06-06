const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const commands = input.slice(1);

class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  push(x) {
    this.items[this.tail] = x;
    this.tail += 1;
  }

  pop() {
    if (this.head === this.tail) {
      return -1;
    } else {
      const item = this.items[this.head];
      this.head += 1;
      return item;
    }
  }

  size() {
    return this.tail - this.head;
  }

  empty() {
    return this.head === this.tail ? 1 : 0;
  }

  front() {
    if (this.head === this.tail) {
      return -1;
    } else {
      return this.items[this.head];
    }
  }

  back() {
    if (this.head === this.tail) {
      return -1;
    } else {
      return this.items[this.tail - 1];
    }
  }
}

const queue = new Queue();
const results = [];

for (let i = 0; i < N; i++) {
  const command = commands[i];
  if (command.startsWith("push")) {
    const [, value] = command.split(" ");
    queue.push(Number(value));
  } else if (command === "pop") {
    results.push(queue.pop());
  } else if (command === "size") {
    results.push(queue.size());
  } else if (command === "empty") {
    results.push(queue.empty());
  } else if (command === "front") {
    results.push(queue.front());
  } else if (command === "back") {
    results.push(queue.back());
  }
}

console.log(results.join("\n"));
