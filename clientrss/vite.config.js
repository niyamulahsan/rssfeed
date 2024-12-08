import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: { "Access-Control-Allow-Origin": "*" },
    hmr: { host: "localhost" },
  },
  plugins: [
    vue({ template: { transformAssetUrls: { base: null, includeAbsolute: false } } }),
  ],
});
