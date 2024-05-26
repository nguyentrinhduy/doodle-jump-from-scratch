export abstract class Collection<T> {
    protected storage: T[] = [];
    size(): number{
        return this.storage.length;
    }
    isEmpty(): boolean{
        return this.storage.length == 0;
    }
    abstract pop(): T | undefined;
    abstract push(element: T): void;
    abstract peek(): T | undefined;
}