const {compile} = require('json-schema-to-typescript')
const fs = require('fs')
const ComponentsJson = require('./components.66717.json')

let tsString = []

async function genTsSchema () {

  for (const values of ComponentsJson.components) {
    const obj = {}
    obj.$id = values.name
    obj.title = values.name + '_storyblok'
    obj.type = 'object'
    obj.properties = typeMapper(values.schema)
    obj.properties._uid = {
      type: 'string'
    }
    obj.properties.component = {
      type: 'string',
      enum: [values.name]
    }
    const requiredFields = ['_uid', 'component']
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
  const parseObj = {}
  Object.keys(schema).forEach((key) => {
    const obj = {}
    const schemaElement = schema[key]
    const type = schemaElement.type
    if (type === 'custom') {
      Object.assign(parseObj, customTypeParser(key, schemaElement))
      return
    } else if (type === 'multilink') {
      Object.assign(parseObj, {
        [key]: {
          type: 'object',
          properties: {
            cached_url: {
              type: 'string'
            },
            linktype: {
              type: 'string'
            }
          }
        }
      })
    }
    const schemaType = parseType(type)
    if (!schemaType) {
      return
    }
    obj[key] = {
      type: schemaType
    }
    if (schemaElement.options && schemaElement.options.length) {
      const items = schemaElement.options.map(item => item.value)
      if (schemaType === 'string') {
        obj[key].enum = items
      } else {
        obj[key].items = {
          enum: items
        }
      }
    }
    Object.assign(parseObj, obj)
  })

  return parseObj
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
    case 'image':
      return 'string'
    case 'boolean':
      return 'boolean'
    case 'textarea':
      return 'string'
    case 'markdown':
      return 'string'
    case 'richtext':
      return 'any'
    default:
      return null
  }
}

function customTypeParser (key, obj) {
  switch (obj.field_type) {
    case 'bootstrap-utility-class-selector':
      return {
        [key]: {
          type: 'object',
          properties: {
            values: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    case 'vue-color-picker':
      return {
        [key]: {
          type: 'object',
          properties: {
            rgba: {
              type: 'string'
            }
          }
        }
      }
    case 'material-icons-selector':
      return {
        [key]: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            }
          }
        }
      }
    case 'tags-select':
      const isSingle = obj.options.find(item => item.name === 'single' && item.value === 'true')
      if (isSingle) {
        return {
          [key]: {
            type: 'object',
            properties: {
              values: {
                type: 'string'
              }
            }
          }
        }
      }
      return {
        [key]: {
          type: 'object',
          properties: {
            values: {
              type: 'array',
              items: {
                type: 'string'
              }
            }

          }
        }
      }
    case 'table':
      return {
        [key]: {
          type: 'object',
          properties: {
            tbody: {
              type: 'array'
            },
            thead: {
              type: 'array'
            }
          }
        }
      }
    default:
      return {}
  }
}


genTsSchema()
  .then(() => {
    fs.writeFileSync('src/typings/generated/components-schema.d.ts', tsString.join('\n'))
  })
