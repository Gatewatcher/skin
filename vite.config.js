import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      };
    },
    {},
  );

  return {
    define: {
      ...envWithProcessPrefix,
      ...(process.env.VITEST && { global: 'window' }),
    },
    resolve: {
      alias: [
        {
          find: /^@\/styles\/mixins/,
          replacement: path.resolve(
            __dirname,
            'src/styles/partials/_mixins.scss',
          ),
        },
        {
          find: /^@\/styles\/functions/,
          replacement: path.resolve(
            __dirname,
            'src/styles/partials/_functions.scss',
          ),
        },
        {
          find: /^@\/styles\/colors/,
          replacement: path.resolve(
            __dirname,
            'src/styles/partials/_colors.scss',
          ),
        },
        {
          find: /^@\/styles\/breakpoints/,
          replacement: path.resolve(
            __dirname,
            'src/styles/partials/_breakpoints.scss',
          ),
        },
        {
          find: /^@\/styles\/alpaga/,
          replacement: path.resolve(
            __dirname,
            'src/styles/partials/_alpaga.scss',
          ),
        },
        {
          find: /^@\/icons/,
          replacement: path.resolve(__dirname, 'src/icons'),
        },
        {
          find: /^@\/illustrations/,
          replacement: path.resolve(__dirname, 'src/illustrations'),
        },
      ],
    },
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
      // Uncomment HMR settings to work on localhost:3000
      hmr: { port: 443, path: '/hmr' },
      // Uncomment this on windows only, it's a problem related to wsl2 and docker on windows
      // https://github.com/vitejs/vite/issues/1153#issuecomment-785467271
      //watch: {
      //  usePolling: true
      //}
    },
    plugins: [
      dts({
        entryRoot: 'src',
        outputDir: 'dist',
        copyDtsFiles: true,
        skipDiagnostics: true,
      }),
      tsconfigPaths(),
      react(),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'skin',
        fileName: format => `index.${format}.js`,
        formats: ['es', 'umd'],
        cssFileName: 'style',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['react', 'react-router-dom'],
      },
      chunkSizeWarningLimit: 2500,
    },
  };
});
