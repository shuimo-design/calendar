import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createMUI } from 'shuimo-ui';
import 'virtual:uno.css';
import 'shuimo-ui/dist/style.css';
import { createPinia } from 'pinia';
import '@shuimo/calendar-core/css';



createApp(App)
  .use(createMUI({
    disableWebComponent: ['MRicePaper','MBorder']
  }))
  .use(createPinia())
  .mount('#app');
