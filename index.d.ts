interface TimeoutablePromiseConstructor {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void, timeout?:number): Promise<T>;
}

declare var TimeoutablePromise: TimeoutablePromiseConstructor;
