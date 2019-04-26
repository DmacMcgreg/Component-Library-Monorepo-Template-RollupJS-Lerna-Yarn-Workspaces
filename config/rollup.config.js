import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
const embedCSS = require('rollup-plugin-embed-css');

export default opts => {
  const options = Object.assign(
    {
      css: true,
    },
    opts
  )

  return {
    input: options.input,
    output: [
      { format: 'cjs', file: './dist/index.cjs.js', sourcemap: false },
      { format: 'es', file: './dist/index.es.js', sourcemap: false },
    ],

    external: [
      'react',
      'react-dom',
      'prop-types',
      'react-helmet',
      'styled-components',
      'classnames',
      'core-js',
    ],

    plugins: [
      peerDepsExternal(),
      nodeResolve({
        extensions: ['.js', '.jsx'],
      }),
      commonjs({
        include: '../../node_modules/**',
      }),
      postcss({
        sourceMap: false,
        plugins: [autoprefixer()],
      }),
      embedCSS(),
      babel({
        runtimeHelpers: true,
        exclude: '../../node_modules/**',
        configFile: '../../babel.config.js',
      }),
    ],
  }
}
