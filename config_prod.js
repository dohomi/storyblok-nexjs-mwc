const fiber = require('fibers')
const sass = require('sass')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')

const sassConfig = {
  sassLoaderOptions: {
    fiber: fiber,
    implementation: sass,
    // includePaths: ['node_modules', glob.sync('packages/*/node_modules').map((d) => path.join(__dirname, d))]
    includePaths: ['node_modules']
  }
}

module.exports = function (env = {}) {
  const config = require('./nextjs_config')(env)

  return withPlugins(
    [
      [withSass, sassConfig],
      [withTM]
    ],
    config
  )
}
