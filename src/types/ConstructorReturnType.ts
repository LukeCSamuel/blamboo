// deno-lint-ignore-file no-explicit-any
export type ConstructorReturnType<T extends any> = T extends new (...args: any[]) => infer R ? R : never;
