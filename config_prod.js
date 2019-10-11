const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')

const sassConfig = {
  sassLoaderOptions: {
    sassOptions: {
      sideEffects: true,
      includePaths: ['node_modules']
    }
  }
}

module.exports = function (env = {}, pathAliasOverwrites = {}, plugins = []) {
  const config = require('./nextjs_config')(env, pathAliasOverwrites)
  const pluginConfiguration = [
    [withSass, sassConfig],
    [withTM]
  ]
  if (plugins.length) {
    plugins.forEach(plugin => {
      if (!Array.isArray(plugin)) {
        throw new Error('plugin configuration must be wrapped in an array.')
      }
      pluginConfiguration.unshift(plugin)
    })
  }
  return withPlugins(pluginConfiguration,
    config
  )
}
