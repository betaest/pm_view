import Vue from 'vue';
import Vuex from 'vuex';
import billquery from './billquery';

Vue.use(Vuex);

export interface GlobalModule {
  name: string;
  success: boolean;
  loading: boolean;
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { billquery },
  state: {
    success: false,
    loading: true,
    name: '',
  },
  mutations: {
    init: state => (state.loading = state.success = true),
    success: (state, payload) => {
      state.loading = false;
      state.success = true;
      state.name = payload.name;
    },
    fail: state => (state.loading = state.success = false),
  },
});
