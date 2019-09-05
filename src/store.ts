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
    root: '',
    billQuery: {
      menu: {},
    },
  },
  mutations: {
    setToken: (state, payload) => ((state.name = payload.name), (state.root = payload.root || state.root)),
    init: state => (state.verify.loading = state.verify.success = true),
    success: state => ((state.verify.loading = false), (state.verify.success = true)),
    fail: state => (state.verify.loading = state.verify.success = false),
    loadBillQueryMenu: (state, payload) => (payload.menu ? (state.billQuery.menu = payload.menu) : undefined),
    setMenuPayload: (state, payload)=>{
      if (payload.name && (<any>state.billQuery.menu)[payload.name]) {
        
      }
    }
  },
});
