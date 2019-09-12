import axios from './axios';
import store from '@/store';

import urls from '@/urls';

export async function loadMenu() {
  store.commit('loadBillQueryMenu', {
    menu: (await axios.get(urls.menu)).data,
  });
}
