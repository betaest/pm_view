import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    verify: {
      success: false,
      loading: true,
    },
    name: '',
    billQuery: {
      menu: {},
    },
  },
  mutations: {
    init: state => (state.verify.loading = state.verify.success = true),
    success: (state, payload) => {
      state.verify.loading = false;
      state.verify.success = true;
      state.name = payload.name;
    },
    fail: state => (state.verify.loading = state.verify.success = false),
    loadBillQueryMenu: (state, payload) => (payload.menu ? (state.billQuery.menu = payload.menu) : undefined),
    setMenuPayload: (state, payload) => {
      if (payload.name && (<any>state.billQuery.menu)[payload.name]) {
      }
    },
  },
});
