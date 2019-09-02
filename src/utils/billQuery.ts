import axios from './axios';
import { MenuUrl } from '@/types/urls';
import { DynamicValue } from '@/types/billQuery';
import store from '@/store';

export async function loadMenu() {
  store.commit('loadBillQueryMenu', {
    menu: (await axios.get(MenuUrl)).data,
  });
}
