import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

function greetHandler(name) {
  console.log("hello " + name);
}

function goodByeHandler(name) {
  console.log("Goodbye " + name);
}

// Register event listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodByeHandler);

// emit events
myEmitter.emit("greet", "john");
myEmitter.emit("goodbye", "john");

// error handling
myEmitter.on("error", (err) => {
  console.log("An error occured", err);
});

// simulate Error
myEmitter.emit("error", new Error("something went wrong"));
