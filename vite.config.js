import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  const isCF = process.env.CF_PAGES === '1' || !!process.env.CF_PAGES;
  const basePrefix = (command === 'build' && !isVercel && !isCF) ? '/ToWhereOnline/' : '/';

  return {
    plugins: [react()],
    base: basePrefix,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        cesium: 'cesium',
      },
    },
    define: {
      CESIUM_BASE_URL: JSON.stringify(basePrefix + 'cesium/'),
    },
    optimizeDeps: {
      include: ['cesium', 'resium'],
    },
  };
});
