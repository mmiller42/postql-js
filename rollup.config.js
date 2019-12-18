import pkg from './package.json'

export default {
  input: 'esm/index.mjs',
  external: Object.keys(pkg.dependencies),
  output: { file: pkg.main, format: 'cjs' }
}
