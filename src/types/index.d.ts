// 方法
declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

declare type Recordable<T = any> = Record<string, T>;