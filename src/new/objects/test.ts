interface SomethingWithAValue<T> {
  value: T;
}

type Head<T> = T extends [infer U, ...unknown[]] ? U : never;
type Rest<T> = T extends [unknown, ...infer U] ? U : never;
type Parameter<T> = SomethingWithAValue<unknown>[];
type ExtractValue<T> = T extends SomethingWithAValue<infer U> ? U : never;
// type ExtractValue<T extends ReadonlyArray<SomethingWithAValue<any>>> = {
//   [K in keyof T]: T[K] extends SomethingWithAValue<infer V> ? V : never;
// };
type Narrowable = string | number | boolean | undefined | null | void | {};
const tuple = <T extends Narrowable[]>(...t: T) => t;

type Test<T> = T extends Parameter<infer U> ? U : never;
function collect<T extends Parameter<unknown>>(array: T): () => Test<T> {
  return () =>
    array.map(
      <U extends SomethingWithAValue<unknown>, V = ExtractValue<U>>(a: U) =>
        a.value as V
    );
}
const t = tuple({ value: 10 }, { value: 'a' });
const x = collect(t);

const a: NonNullable<number | null>;
