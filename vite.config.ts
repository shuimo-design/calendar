import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), vueJSX(),
    UnoCSS()
  ],
});
