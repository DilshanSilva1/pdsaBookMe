 class PriorityQueue {
            constructor() {
                this.items = [];
            }

            enqueue(booking, isPriority) {
                const queueItem = {
                    ...booking,
                    isPriority,
                    timestamp: Date.now(),
                    queueNumber: this.items.length + 1
                };
                this.items.push(queueItem);
                this.items.sort((a, b) => {
                    if (a.isPriority !== b.isPriority) {
                        return b.isPriority - a.isPriority;
                    }
                    return a.timestamp - b.timestamp;
                });
            }

            dequeue() {
                return this.items.shift();
            }

            size() {
                return this.items.length;
            }

            getAll() {
                return this.items;
            }
        }