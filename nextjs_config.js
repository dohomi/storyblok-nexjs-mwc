// const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

function nextjsConfigGen (env, pathAliasOverwrites = {}) {

  const defaults = {
    target: 'serverless',
    compress: false,
    // transpileModules: ['@lumen/mwc'],
    env,
    webpack: (config) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.resolve.plugins.push(new TsconfigPathsPlugin())

      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js']) {
          entries['main.js'].unshift('./client/polyfills.js');
        }
        return entries;
      };
      return config
    }
  }
  return defaults
}

module.exports = nextjsConfigGen
