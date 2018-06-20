import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'

export default {
  input: 'src/core/index.js',
  output: {
    file: 'dist/wx-caman.js',
    sourcemap: 'inline',
    name: 'WxCaman',
    format: 'es'
  },
  plugins: [
    eslint({
      include: 'src/**'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve(),
    commonjs()
  ]
}
