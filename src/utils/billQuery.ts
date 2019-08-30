import axios from './axios';
import { MenuUrl } from '@/types/urls';
import { DynamicValue } from '@/types/billQuery';
import store from '@/store';

export async function loadMenu() {
  store.commit('loadBillQueryMenu', {
    menu: (await axios.get(MenuUrl)).data,
  });
}

export function translate(value: DynamicValue) {
  return value.type === 'eval' ? eval(value.value) : value.value;
}

export function translateBody(body: Record<string, any>) {
  var r = [];
  for (var name in body)
    if (body.hasOwnProperty(name))
      r.push({
        id: name,
        value: body[name],
      });

  return r;
}
