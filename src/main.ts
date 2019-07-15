import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/plugins/iview-importer';
import 'iview/dist/styles/iview.css';
import '@/fonts/iconfont.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
