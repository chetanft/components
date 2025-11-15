import type { StorybookConfig } from '@storybook/react-vite';
import type { Indexer } from '@storybook/types';
import { loadCsf } from '@storybook/csf-tools';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { transform } from 'esbuild';

// Custom TypeScript indexer for Storybook 8
const tsxIndexer: Indexer = {
  test: /(stories|story)\.(ts|tsx)$/,
  async load(filePath) {
    const source = await readFile(filePath, 'utf8');
    const loader = path.extname(filePath) === '.ts' ? 'ts' : 'tsx';
    const { code } = await transform(source, {
      loader,
      format: 'esm',
      target: 'es2019',
      sourcemap: false,
    });

    return loadCsf(code, {
      fileName: filePath,
      makeTitle: (userTitle) => userTitle,
    });
  },
};

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  indexers: async (existing = []) => [tsxIndexer, ...existing],
  viteFinal: async (config) => {
    // Optimize for deployment
    if (config.build) {
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          manualChunks: undefined, // Disable manual chunking that can cause issues
        },
      };
      // Increase chunk size warning limit
      config.build.chunkSizeWarningLimit = 1000;
    }
    return config;
  },
};

export default config; 