import {
  VAppBar,
  VBtn,
  VCard,
  VCol,
  VContainer,
  VDivider,
  VIcon,
  VLayout,
  VList,
  VListItem,
  VListItemTitle,
  VNavigationDrawer,
  VMain,
  VRow,
  VTextField,
} from 'vuetify/components';
import {
  Ripple
} from 'vuetify/directives';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  components: {
    VAppBar,
    VBtn,
    VCard,
    VCol,
    VContainer,
    VDivider,
    VIcon,
    VLayout,
    VList,
    VListItem,
    VListItemTitle,
    VNavigationDrawer,
    VMain,
    VRow,
    VTextField,
  },
  directives: {
    Ripple,
  },
});

export default vuetify;