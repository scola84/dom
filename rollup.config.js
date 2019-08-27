import { rollup } from '@scola/worker'
import ignore from 'rollup-plugin-ignore'
import { name, version } from './package.json'

const {
  banner,
  plugins
} = rollup

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
    banner: banner(name, version),
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
    banner: banner(name, version),
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
