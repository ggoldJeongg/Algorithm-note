const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const commands = input.slice(1);

const queue = [];
let head = 0;
const results = [];

for (let i = 0; i < N; i++) {
  const command = commands[i];

  if (command.startsWith("push")) {
    const [, value] = command.split(" ");
    queue.push(Number(value));
  } else if (command === "pop") {
    if (head === queue.length) {
      results.push(-1);
    } else {
      results.push(queue[head]);
      head += 1;
    }
  } else if (command === "size") {
    results.push(queue.length - head);
  } else if (command === "empty") {
    results.push(head === queue.length ? 1 : 0);
  } else if (command === "front") {
    if (head === queue.length) {
      results.push(-1);
    } else {
      results.push(queue[head]);
    }
  } else if (command === "back") {
    if (head === queue.length) {
      results.push(-1);
    } else {
      results.push(queue[queue.length - 1]);
    }
  }
}

console.log(results.join("\n"));
