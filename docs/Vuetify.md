# Les bases de Vue 3

### Installer Vuetify
```js
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';

const app = createApp(
  App, {
    name: 'Vuetify'
  }
);

const vuetify = createVuetify({
  components,
  directives
});

app.use(vuetify);

app.mount('#vueapp');
```

```shell
vite v4.3.9 building for production...
✓ 432 modules transformed.
[...]
dist/assets/index-146dcc3a.css                            711.03 kB │ gzip: 100.87 kB
dist/assets/index-52d0345f.js                             352.49 kB │ gzip: 110.25 kB
✓ built in 9.09s
```


### Installer Vuetify en Tree-shaking
```js
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
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

import App from './App.vue';

const app = createApp(
  App, {
    name: 'Vuetify'
  }
);


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

app.use(vuetify);

app.mount('#vueapp');
```

```shell
vite v4.3.9 building for production...
✓ 432 modules transformed.
[...]
dist/assets/index-723c3a02.css                            615.26 kB │ gzip: 88.50 kB
dist/assets/index-27f51601.js                             179.44 kB │ gzip: 60.48 kB
✓ built in 6.97s
```

