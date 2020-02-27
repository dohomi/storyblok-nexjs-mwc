module.exports = function (api) {
  api.cache(true)
  const presets = [
    [
      'next/babel'
      // ,
      // {
      //   'preset-env': {
      //     'targets': {
      //       'browsers': ['>0.5%, last 2 versions, not dead, IE 11']
      //     },
      //     'useBuiltIns': 'usage'
      //   }
      // }
    ]
  ]
  return {
    presets
  }
}
