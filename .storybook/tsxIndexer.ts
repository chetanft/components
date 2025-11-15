import { loadCsf } from '@storybook/csf-tools';
import type { Indexer } from '@storybook/types';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { transform } from 'esbuild';

export const tsxIndexer: Indexer = {
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

