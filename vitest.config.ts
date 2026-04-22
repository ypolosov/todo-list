import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'text-summary', 'html', 'json-summary'],
        include: ['src/domain/**', 'src/application/**'],
        exclude: ['**/index.ts', '**/*.d.ts', 'src/adapters/**'],
        thresholds: {
          lines: 100,
          functions: 100,
          branches: 100,
          statements: 100,
        },
      },
    },
  }),
);
