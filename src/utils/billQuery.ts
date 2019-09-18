import axios from './axios';
import store from '@/store';

import urls from '@/urls';
import { Result, Title } from '@/types/billQuery';

export async function loadMenu() {
  store.commit('menu.init', {
    menu: (await axios.get(urls.menu)).data,
  });
}

export async function execute(): Promise<Result> {
  const title: Array<Title> = [];
  const body = [];

  for (let i = 0; i < Math.round(Math.random() * 3); ++i)
    title.push({
      tag: 'span',
      text: `${new Date()} -- ${Math.round(Math.random() * 3)}`,
      props: {
        style: 'font-style: italic',
      },
    });

  for (let i = 0; i < Math.round(Math.random() * 100); ++i)
    body.push({
      serv_id: i,
      world: Math.round(Math.random() * 100),
      children: [{
        serv_id: i + 10,
        world: Math.round(Math.random() * 100),
      }],
    });

  return {
    total: body.length,
    title,
    header: [
      {
        key: 'serv_id',
        title: 'serv_id',
      },
      {
        key: 'world',
        title: '世界',
      },
    ],
    body,
  };
}
