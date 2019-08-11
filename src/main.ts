import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/plugins/iview-importer';
import 'iview/dist/styles/iview.css';
import '@/fonts/iconfont.css';

import axios from '@/utils/axios';
import { VerifyUrl } from '@/types/urls';
import { VerifyReturn } from '@/types/verify';

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  if (to.path === '/') next();

  try {
    const token = to.query.token;

    var response = await axios.get(`${VerifyUrl}/${token || ''}`);

    if (response && (response.data as VerifyReturn).success) {
      const r = response.data as VerifyReturn;

      store.commit('setToken', { name: r.name, token: r.guid, root: r.to });
      store.commit('success');

      next(store.state.root || undefined);
    } else throw new Error('验证失败，请重新登陆');
  } catch (e) {
    Vue.prototype.$Notice.error({
      title: '错误',
      desc: (e as Error).message,
    });

    store.commit('fail');

    next('/');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
