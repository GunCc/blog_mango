import { App, InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  count: number
}

const key: InjectionKey<Store<State>> = Symbol();

const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state: State) {
      state.count++
    }
  },
})

export function useStore() {
  return baseUseStore(key);
}

export function setupStore(app: App<Element>) {
  app.use(store, key)
}
export default store
