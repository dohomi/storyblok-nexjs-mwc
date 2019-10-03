const {compileFromFile} = require('json-schema-to-typescript')
const fs = require('fs')

compileFromFile('components.57415.json')
  .then(ts => {
    console.log(ts)

    fs.writeFileSync('components.d.ts', ts)
  })
