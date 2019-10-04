const {compile} = require('json-schema-to-typescript')
const fs = require('fs')
const components = require('./components.57415.json')

compileFromFile('components.57415.json')
  .then(ts => {
    console.log(ts)

    fs.writeFileSync('components.d.ts', ts)
  })
