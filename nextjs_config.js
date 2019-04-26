const path = require('path')
module.exports = (env) => ({
  target: 'serverless',
  transpileModules: ['@lumen/mwc'],
  env,
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['routes'] = path.join(__dirname, 'routes')
    config.resolve.alias['client'] = path.join(__dirname, 'client')
    config.resolve.alias['fonts'] = path.join(__dirname, 'components/fonts.js')

    // polyfills
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (
        entries['main.js'] &&
        !entries['main.js'].includes('client/polyfills.js')
      ) {
        entries['main.js'].unshift('client/polyfills.js')
      }
      return entries
    }

    return config
  }
  // webpack: (config, {buildId, dev, isServer, defaultLoaders}) => config,
  // workboxOpts: {
  //   swDest: 'static/service-worker.js',
  //   runtimeCaching: [
  //     {
  //       urlPattern: /^https?.*/,
  //       handler: 'networkFirst',
  //       options: {
  //         cacheName: 'https-calls',
  //         networkTimeoutSeconds: 15,
  //         expiration: {
  //           maxEntries: 150,
  //           maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
  //         },
  //         cacheableResponse: {
  //           statuses: [0, 200]
  //         }
  //       }
  //     }
  //   ]
  // }
})
