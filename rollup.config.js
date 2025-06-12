import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  // Main package build
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'FTDesignSystem',
        sourcemap: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      url({
        include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
        limit: 8192, // 8kb limit for inlining, larger files will be copied
        fileName: 'assets/[name][extname]'
      }),
      postcss({
        extract: true,
        extract: [
          'dist/styles.css',
          'dist/css/base.css'
        ],
        minimize: true,
        config: {
          path: './postcss.config.js',
        },
      }),
      typescript({ 
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types',
        outDir: './dist'
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // AI layer build
  {
    input: 'src/ai/index.ts',
    output: [
      {
        file: 'dist/ai/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/ai/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      url({
        include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
        limit: 8192,
        fileName: 'assets/[name][extname]'
      }),
      typescript({ 
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types',
        outDir: './dist'
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // Type definitions for main package
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  // Type definitions for AI layer
  {
    input: 'dist/types/ai/index.d.ts',
    output: [{ file: 'dist/ai/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]; 