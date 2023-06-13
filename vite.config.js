import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default () => {
  return defineConfig({
    build: {
      minify: 'terser',
    },
    plugins: [
      vue(),
      vuetify(),
    ],
    resolve: {
      alias: {
        '@Public': fileURLToPath(new URL('./public', import.meta.url)),
        '@Src': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '../assets/main.scss';`
        }
      }
    },
  });
};
