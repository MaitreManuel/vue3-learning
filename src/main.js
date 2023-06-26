import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createApp } from 'vue';

import VueRouter from '@Src/plugins/VueRouter';
import Vuetify from '@Src/plugins/Vuetify';

import App from './App.vue';

const app = createApp(App, {
  name: 'Vue 3 Learning'
});


app.use(VueRouter);
app.use(Vuetify);

app.mount('#vueapp');
