const {compile} = require('json-schema-to-typescript')
const fs = require('fs')
const ComponentsJson = require('./components.57415.json')

let tsString = []

async function genTsSchema () {

  for (const values of ComponentsJson.components) {
    const obj = {}
    obj.title = values.name
    obj.type = 'object'
    obj.properties = typeMapper(values.schema)
    const requiredFields = []
    Object.keys(values.schema).forEach(key => {
      if (values.schema[key].required) {
        requiredFields.push(key)
      }
    })
    if (requiredFields.length) {
      obj.required = requiredFields
    }
    try {
      const ts = await compile(obj, values.name, {bannerComment: ''})
      tsString.push(ts)
    } catch (e) {
      console.log(e)
    }
  }

}

function typeMapper (schema = {}) {
  const parsedObj = Object.keys(schema).reduce((obj, key) => {
    const schemaElement = schema[key]
    const schemaType = parseType(schemaElement.type)
    if (!schemaType) {
      return obj
    }
    obj[key] = {
      type: schemaType
    }
    if (schemaElement.options) {
      obj[key] = {
        enum: schemaElement.options.map(item => item.value)
      }
    }
    return obj
  }, {})

  return parsedObj
}

function parseType (type) {
  switch (type) {
    case 'text':
      return 'string'
    case 'bloks':
      return 'array'
    case 'option':
      return 'string'
    case 'options':
      return 'array'
    case 'number':
      return 'number'
    default:
      return null
  }
}


genTsSchema()
  .then(() => {

    console.log(tsString)
    fs.writeFileSync('src/typings/generated/components-schema.d.ts', tsString.join('\n'))
  })
