class Semaphore {
  constructor(maxCount = 1) {
    this.counter = maxCount; // Maximum number of locks allowed
    this.queue = []; // Queue for waiting operations
  }

  async lock() {
    if (this.counter > 0) {
      this.counter -= 1; // Acquire lock immediately
    } else {
      // Add to queue and wait for the unlock
      await new Promise((resolve) => this.queue.push(resolve));
    }
  }

  unlock() {
    if (this.queue.length > 0) {
      // Resolve the next waiting operation
      const nextResolve = this.queue.shift();
      nextResolve(); // Allow the next waiting lock to proceed
    } else {
      // Increment the counter if no one is waiting
      this.counter += 1;
    }
  }
}

module.exports = Semaphore;