import { Collection } from './Collection'

export class Queue<T> extends Collection<T> {
    pop(): T | undefined {
        return this.storage.shift()
    }

    push(element: T): void {
        this.storage.push(element)
    }

    peek(): T | undefined {
        return this.storage[this.storage.length - 1]
    }
}
