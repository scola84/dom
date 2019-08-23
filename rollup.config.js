import { writeFileSync } from 'fs'
import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
import ignore from 'rollup-plugin-ignore'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'

const external = [
  '@scola/http',
  '@scola/worker',
  'postal-codes-js'
]

const globals = {
  '@scola/http': 'scola.http',
  '@scola/worker': 'scola.worker',
  'postal-codes-js': 'postalCodesJs'
}

const input = './index.js'

const plugins = [
  resolve(),
  commonjs(),
  builtins(),
  css({
    include: [new RegExp('.css')],
    output: (styles) => {
      writeFileSync(
        'dist/dom.css',
        styles.replace(
          /\.\.\//g,
          'https://unpkg.com/ionicons@4.6.3/dist/'
        )
      )
    }
  }),
  json(),
  babel({
    plugins: [
      ['@babel/plugin-transform-runtime', {
        helpers: false
      }]
    ],
    presets: [
      ['@babel/preset-env']
    ]
  })
]

export default [{
  input,
  external,
  output: {
    extend: true,
    file: 'dist/dom.umd.js',
    format: 'umd',
    globals,
    name: 'scola.dom'
  },
  plugins
}, {
  input,
  external,
  output: {
    file: 'dist/dom.cjs.js',
    format: 'cjs',
    globals
  },
  plugins: [
    ignore([
      'dom-shims',
      'fastclick'
    ]),
    ...plugins
  ]
}]
