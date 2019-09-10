import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/ProjectManager',
      name: 'proj',
      meta: {
        reqAuth: true,
      },
      component: () => import(/* webpackChunkName: "ProjectManager" */ './views/ProjectManager.vue'),
    },
    {
      path: '/BillQuery',
      name: 'bill',
      meta: {
        reqAuth: false,
      },
      component: () => import(/* webpackChunkName: "BillQuery" */ './views/BillQuery.vue'),
    },
  ],
});
