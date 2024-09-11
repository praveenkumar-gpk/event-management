// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Set the environment to simulate browser-like environment
    globals: true,        // Use global variables like `describe`, `it`, `expect` without imports
    setupFiles: './src/setupTests.ts', // Path to setup file
    exclude: [...configDefaults.exclude, '**/node_modules/**'],
  },
});
