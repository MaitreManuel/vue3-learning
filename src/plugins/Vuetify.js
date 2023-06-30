import {
  VAppBar,
  VCol,
  VContainer,
  VLayout,
  VMain,
  VRow,
} from 'vuetify/components';
import {
  Ripple
} from 'vuetify/directives';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  components: {
    VAppBar,
    VCol,
    VContainer,
    VLayout,
    VMain,
    VRow,
  },
  directives: {
    Ripple,
  },
});

export default vuetify;