const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')]
        }
      },
      require.resolve('react-docgen-typescript-loader')
    ]
  })
  config.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
    use: ['style-loader', 'css-loader', {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: ['node_modules']
        }
      }
    }],
    include: path.resolve(__dirname, '../')
  })
  config.resolve.extensions.push('.ts', '.tsx')

  // const overwrites = {
  //   components: path.join(__dirname, '../components'),
  //   routes: path.join(__dirname, '../server/routes.ts'),
  //   client: path.join(__dirname, '../client'),
  //   fonts: path.join(__dirname, '../components/fonts.ts')
  // }

  // config.resolve.modules.unshift(__dirname)
  // Object.keys(overwrites).forEach(key => {
  //   config.resolve.alias[key] = overwrites[key]
  // })
  config.resolve.plugins = config.resolve.plugins || []
  config.resolve.plugins.push(new TsconfigPathsPlugin())


  return config
}
