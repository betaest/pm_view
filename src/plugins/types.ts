import Vue from 'vue';
import { Layout, Icon, Menu, MenuItem, Input } from 'iview';

function component(...cs: any[]) {
  for (const c of cs) {
    Vue.component(c.name, c);
  }
}

component(Layout, Icon, Menu, MenuItem, Input);
