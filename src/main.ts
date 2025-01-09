import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createMUI } from 'shuimo-ui';
import 'virtual:uno.css';
import 'shuimo-ui/dist/style.css';



createApp(App)
  .use(createMUI({
    disableWebComponent: ['MRicePaper','MBorder']
  }))
  .mount('#app');
