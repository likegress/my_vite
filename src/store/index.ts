import { InjectionKey } from "vue";

import { useStore as baseUseStore, createStore, Store } from "vuex";

interface State {
  username: string;
  token: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    username: "allen",
    token: "1234",
  },
  getters: {
    getName: (state) => {
      return state.username;
    },
  },
  mutations: {
    SET_USERNAME(state, username: string) {
      state.username = username;
    },
  },
  actions: {},
});

export function useStore() {
  return baseUseStore(key);
}
