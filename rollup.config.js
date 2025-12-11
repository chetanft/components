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
          'react/jsx-runtime': 'ReactJSXRuntime',
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
        extract: 'dist/styles.css',
        minimize: true,
        config: {
          path: './postcss.config.js',
        },
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types',
        outDir: './dist',
        jsx: 'react-jsx'
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  // AI-protected components build
  {
    input: 'src/ai.ts',
    output: [
      {
        file: 'dist/ai.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/ai.esm.js',
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
        outDir: './dist',
        jsx: 'react-jsx'
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime', /\.css$/, /\.scss$/],
  },
  // Core (unprotected) layer build
  {
    input: 'src/core/index.ts',
    output: [
      {
        file: 'dist/core/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/core/index.esm.js',
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
        outDir: './dist',
        jsx: 'react-jsx'
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime', /\.css$/, /\.scss$/],
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
    input: 'dist/types/ai.d.ts',
    output: [{ file: 'dist/ai.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  // Type definitions for core layer
  {
    input: 'dist/types/core/index.d.ts',
    output: [{ file: 'dist/core/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]; 