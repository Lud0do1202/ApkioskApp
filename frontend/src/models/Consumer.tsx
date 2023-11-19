export type Consumer<T> = (obj : T) => void
export type Consumer2<T, U> = (obj1 : T, obj2 : U) => void