import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import external from "rollup-plugin-peer-deps-external";
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'styled-chemistry',
      format: 'commonjs',
      sourcemap: true,
      plugins: [
        terser(),
      ],
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve({
      mainFields: [
        'module',
        'jsnext',
        'main'
      ],
      extensions,
    }),
    typescript({
      exclude: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
      runtimeHelpers: true,
    }),
  ],
  external: [
    'react',
    'react-dom',
    'styled-components',
  ],
}