import Vuex, { Module } from 'vuex';
import { GlobalModule } from '..';
import { MenuItem, MenuItemState } from '@/types/billQuery';

interface ModuleState {
  menus: Record<string, Array<MenuItem>>;
  states: Record<string, MenuItemState>;
  query: Record<string, any>;
}

export default {
  namespaced: true,
  state: {
    menus: {},
    states: {},
    query: {},
  },
  mutations: {
    init: (state, { menus }: { menus: Record<string, Array<MenuItem>> }) => {
      state.menus = menus;

      const states: Record<string, MenuItemState> = {};

      for (var name in menus) states[name] = { visibility: false, left: 0, top: 0 };

      state.states = states;
    },
    pop: (state, { name, left, top }) => {},
  },
} as Module<ModuleState, GlobalModule>;
