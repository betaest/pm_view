import { Module } from 'vuex';
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

      for (var name in menus) states[name] = { visibility: false, left: 0, top: 0, value: '' };

      state.states = states;
    },
    pop: (state, { name, left, top, value }) => {
      for (var s in state.states) if (state.states[s].visibility) state.states[s].visibility = false;

      if (name in state.states) {
        const m = state.states[name];

        m.visibility = true;
        m.left = left;
        m.top = top;
        m.value = value;
      }
    },
  },
} as Module<ModuleState, GlobalModule>;
