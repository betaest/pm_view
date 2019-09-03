import axios from './axios';
import store from '@/store';

import { MenuUrl } from '@/types/urls';

export async function loadMenu() {
  store.commit('loadBillQueryMenu', {
    menu: (await axios.get(MenuUrl)).data,
  });
}
