const fiber = require('fibers')
const sass = require('sass')
const path = require('path')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSass = require('@zeit/next-sass')
// withMDX = require('@zeit/next-mdx')(),
// const withOffline = require('next-offline')
const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')()
const {BUNDLE_ANALYZE} = process.env
const bundleAnalyzerConfig = {
  analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}
const Dotenv = require('dotenv-webpack')


const nextConfig = {
  target: 'serverless',
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['routes'] = path.join(__dirname, 'routes')
    return config
  },
  // webpack: (config, {buildId, dev, isServer, defaultLoaders}) => config,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
}
const sassConfig = {
  sassLoaderOptions: {
    fiber: fiber,
    implementation: sass,
    // includePaths: ['node_modules', glob.sync('packages/*/node_modules').map((d) => path.join(__dirname, d))]
    includePaths: ['node_modules']
  }
}

module.exports = withPlugins(
  [
    // @zeit/next-bundle-analyzer
    [withBundleAnalyzer, bundleAnalyzerConfig],
    // @zeit/next-sass
    [withSass, sassConfig],
    // @zeit/next-mdx
    // [withMDX],
    // next-offline
    // [withOffline],
    // @zeit/next-source-maps
    [withSourceMaps]
  ],
  nextConfig
)
