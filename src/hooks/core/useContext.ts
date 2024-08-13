import { reactive, type InjectionKey, readonly as defineReadonly, provide, type UnwrapRef, inject, } from "vue";
export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}
// * 将传入的context通过provide提供出去
export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = true, native = false } = options;

  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  createProvider && provide(key, native ? context : provideData);

  return {
    state,
  };
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

// * 使用inject获取provide提供的key值
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;
export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any,
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}
