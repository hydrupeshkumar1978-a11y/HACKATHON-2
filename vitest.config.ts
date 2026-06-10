import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'lcov'],
      statements: 50,
      branches: 40,
      functions: 50,
      lines: 50,
    },
  },
});
