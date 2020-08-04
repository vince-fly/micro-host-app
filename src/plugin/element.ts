import Vue from 'vue';
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  MessageBox,
  Message,
  ColorPicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'element-ui';
import Scrollbar from 'element-ui/packages/scrollbar';
Vue.use(Menu);
Vue.use(Button);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Scrollbar);
Vue.use(MenuItemGroup);
Vue.use(ColorPicker);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.prototype.$message = Message;
