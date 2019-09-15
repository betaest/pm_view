import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { verify } from '@/utils/verify';
import { Notice } from 'iview';

import '@/plugins/iview-importer';
import '@/fonts/iconfont.css';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

router.beforeEach(async (to, from, next) => {
  store.commit('init');

  if ((to.path === '/' && !('token' in to.query)) || !to.meta.reqAuth) {
    store.commit('fail');
    return next();
  }

  try {
    var result = await verify((to.query.token as string) || '', to.path);

    if (result.success) {
      store.commit('success', result);
      next(result.to || undefined);
    } else throw new Error('请检查网络信息，用户信息');
  } catch (e) {
    (<any>Notice).error({
      title: '验证失败',
      desc: (e as Error).message,
    });

    store.commit('fail');

    return next('/');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
