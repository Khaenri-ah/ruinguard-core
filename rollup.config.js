/* eslint-disable @typescript-eslint/no-var-requires */
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const cleanup = require('rollup-plugin-cleanup');
const pkg = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      file: pkg.exports.import,
      sourcemap: false,
    },
    {
      format: 'cjs',
      file: pkg.exports.require,
      sourcemap: false,
      esModule: false,
    },
  ],
  external: [
    ...require('module').builtinModules,
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [resolve, typescript({ useTsconfigDeclarationDir: true }), cleanup({ comments: 'none', extensions: ['js', 'ts'] })],
};