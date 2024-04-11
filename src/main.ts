import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import App from '@/App.vue';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@/style.css';
import 'vuetify/styles';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
});

createApp(App).use(vuetify).mount('#app');
