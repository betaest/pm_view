import axios from './axios';
import store from '@/store';

import urls from '@/urls';
import { Result, Section, MenuItem, QueryJsonL } from '@/types/billQuery';

export async function loadMenu() {
  const demoMenu: Record<string, Array<MenuItem>> = {
    serv_id: [
      {
        title: '查询用户资料',
        action: 0,
      },
      {
        title: '查询用户缴费信息',
        action: 1,
      },
    ],
    world: [
      {
        title: '查询用户资料',
        action: 0,
      },
      {
        title: '查询用户缴费信息',
        action: 1,
        divided: true,
      },
    ],
  };

  store.commit('billquery/init', { menus: demoMenu });
}

export async function execute(params: QueryJsonL): Promise<Result> {
  const title: Array<Section> = [];
  const body = [];

  title.push({
    tag: 'billing-cycle-picker',
    props: {
      text: '账单费用',
    },
    events: {
      'on-change': (...args: any[]) => console.log(...args),
    },
  });

  for (let i = 0; i < Math.round(Math.random() * 2) + 1; ++i)
    title.push({
      tag: 'span',
      text: `${new Date()} -- ${Math.round(Math.random() * 3)}`,
      props: {
        style: 'font-style: italic',
      },
    });

  for (let i = 0; i < Math.round(Math.random() * 100); ++i)
    body.push({
      serv_id: '客户名称',
      world:
        '江苏省苏州市彩虹二区很长的地址,江苏省苏州市彩虹二区很长的地址,江苏省苏州市彩虹二区很长的地址,江苏省苏州市彩虹二区很长的地址,江苏省苏州市彩虹二区很长的地址,江苏省苏州市彩虹二区很长的地址',
      children: [
        {
          serv_id: i + 10,
          world: Math.round(Math.random() * 100),
          children: [
            {
              serv_id: 1112,
              world: 'Hello',
            },
            {
              serv_id: 1112,
              world: '第二层嵌套',
            },
          ],
        },
      ],
    });

  return {
    total: body.length,
    title,
    header: [
      {
        key: 'serv_id',
        title: 'serv_id',
        sortable: true,
        width: 400,
      },
      {
        key: 'world',
        title: '世界',
      },
    ],
    body,
  };
}
