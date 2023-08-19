import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as groupStore from "./groups";

Vue.use(Vuex);

const persistedsDataState = createPersistedState({
  key: "groupvuex",
  paths: ["group"],
});

export default new Vuex.Store({
  plugins: [persistedsDataState],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    group: {
      namespaced: true,
      ...groupStore,
    },
  },
});
