import Vue from 'vue';
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Message,
  ColorPicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Tag,
  MessageBox,
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
Vue.use(Tag);
// Vue.use(Alert);
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
