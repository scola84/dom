const plugins = require('@scola/worker/rollup.plugins')
const ignore = require('rollup-plugin-ignore')

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
