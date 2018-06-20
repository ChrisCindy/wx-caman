import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify-es'

export default {
  input: 'src/core/index.js',
  output: {
    file: 'dist/wx-caman.min.js',
    name: 'WxCaman',
    format: 'es'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve(),
    commonjs(),
    uglify()
  ]
}
