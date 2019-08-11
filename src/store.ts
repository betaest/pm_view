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
    setToken: (state, payload) => ((state.name = payload.name), (state.root = payload.root)),
    success: state => ((state.verify.loading = false), (state.verify.success = true)),
    fail: state => ((state.verify.loading = false), (state.verify.success = false)),
  },
});

export default store;
