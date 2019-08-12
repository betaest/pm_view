import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    verify: {
      success: true,
      loading: true,
    },
    name: '',
    root: '',
  },
  mutations: {
    setToken: (state, payload) => ((state.name = payload.name), (state.root = payload.root || state.root)),
    init: state => (state.verify.loading = state.verify.success = true),
    success: state => ((state.verify.loading = false), (state.verify.success = true)),
    fail: state => (state.verify.loading = state.verify.success = false),
  },
});

export default store;
