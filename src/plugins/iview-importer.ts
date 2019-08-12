import Vue from 'vue';
import {
  Layout,
  Icon,
  Menu,
  MenuItem,
  Input,
  Table,
  Tooltip,
  Button,
  ButtonGroup,
  Drawer,
  Form,
  FormItem,
  Row,
  Col,
  Upload,
  Notice,
  Spin,
  Page,
  Poptip,
  Sider,
  Select,
  Option,
} from 'iview';

function install(cs: Record<string, any>) {
  for (const name in cs)
    if (cs.hasOwnProperty(name)) {
      Vue.component(name, cs[name]);
    }
}

install({
  Layout,
  Icon,
  Menu,
  MenuItem,
  Input,
  Table,
  Tooltip,
  Button,
  ButtonGroup,
  Drawer,
  Form,
  FormItem,
  Row,
  Col,
  Upload,
  Spin,
  Page,
  Poptip,
  Sider,
  Select,
  Option,
});

Vue.prototype.$Notice = Notice;
Vue.prototype.$Spin = Spin;
