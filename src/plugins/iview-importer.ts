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
  Select,
  Scroll,
  Card,
} from 'iview';

function component(cs: Record<string, any>) {
  for (const name in cs)
    if (cs.hasOwnProperty(name)) {
      Vue.component(name, cs[name]);
    }
}

component({
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
  Select,
  Scroll,
  Card,
});
