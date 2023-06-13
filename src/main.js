import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { createRouter, createWebHashHistory } from 'vue-router';
import {
  VBtn,
  VCard,
  VCol,
  VContainer,
  VDivider,
  VLayout,
  VList,
  VListItem,
  VListItemTitle,
  VNavigationDrawer,
  VTextField,
  VMain,
  VRow,
} from 'vuetify/components';
import {
  Ripple
} from 'vuetify/directives';

import routes from '@Src/plugins/routes';
import App from './App.vue';

const app = createApp(App, {
  name: 'Vue 3 Learning'
});
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const vuetify = createVuetify({
  components: {
    VBtn,
    VCard,
    VCol,
    VContainer,
    VDivider,
    VLayout,
    VList,
    VListItem,
    VListItemTitle,
    VNavigationDrawer,
    VTextField,
    VMain,
    VRow,
  },
  directives: {
    Ripple,
  },
});

app.use(router);
app.use(vuetify);

app.mount('#vueapp');
