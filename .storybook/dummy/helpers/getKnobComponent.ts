import COMPONENT_JSON from '../../../components.66717.json'
import { allImageOptions, getUid, iconOptions } from '../core/various'
import { boolean, color, number, optionsKnob, select, text } from '@storybook/addon-knobs'
import { classNameOpts } from './utilityClassNamesHelper'


export const camelizeString = (text: string, separator = '_') => (
  text.split(separator)
    .map(w => w.replace(/./, (m: string) => m.toUpperCase()))
    .join(' ')
)

type KeyValueStoryblok = {
  value: string
  name: string
}

const optionsArrayToObject = (array: KeyValueStoryblok[], addEmpty?: boolean): object => {
  const obj = {}
  if (addEmpty) {
    obj['Please Select'] = undefined
  }
  array.forEach(valuePair => {
    obj[valuePair.name] = valuePair.value
  })
  return obj
}


const getKnobComponents = ({ componentName, options = {}, knob, count = '' }: { componentName: string, options?: any, knob?: string, count?: number | string }) => {
  const findComponents = COMPONENT_JSON.components.find(component => {
    return component.name === componentName
  })
  const schema = findComponents && findComponents.schema

  if (!schema) {
    throw new Error(`component declaration not found: ${componentName}`)
  }
  const obj = {
    component: componentName,
    _uid: getUid()
  }
  Object.keys(schema).forEach(schemaKey => {
    const currentSchema = schema[schemaKey]
    const name = `${camelizeString(componentName)} ${camelizeString(schemaKey)} ${count}`
    const type = currentSchema.type
    if (type === 'option') {
      obj[schemaKey] = select(name, optionsArrayToObject(currentSchema.options, true), options[schemaKey] || undefined, knob || camelizeString(componentName))
    } else if (type === 'options') {
      obj[schemaKey] = optionsKnob(name, optionsArrayToObject(currentSchema.options), options[schemaKey] || undefined, { display: 'inline-check' }, knob || camelizeString(componentName))
    } else if (type === 'text' || type === 'markdown' || type === 'textarea') {
      obj[schemaKey] = text(name, options[schemaKey] || '', knob || camelizeString(componentName))
    } else if (type === 'number') {
      obj[schemaKey] = number(name, options[schemaKey] || undefined, {}, knob || camelizeString(componentName))
    } else if (type === 'boolean') {
      obj[schemaKey] = boolean(name, options[schemaKey] || false, knob || camelizeString(componentName))
    } else if (type === 'image') {
      obj[schemaKey] = select(name, { ...allImageOptions }, options[schemaKey] || undefined, knob || camelizeString(componentName))
    } else if (currentSchema.field_type === 'material-icons-selector') {
      console.log(currentSchema)
      obj[schemaKey] = {
        name: select(name, iconOptions, (options[schemaKey] && options[schemaKey].name) || undefined, knob || camelizeString(componentName))
      }
    } else if (currentSchema.field_type === 'vue-color-picker') {
      obj[schemaKey] = {
        rgba: color(name, (options[schemaKey] && options[schemaKey].rgba) || undefined, knob || camelizeString(componentName))
      }
    } else if (currentSchema.field_type === 'bootstrap-utility-class-selector') {
      // if (!utilityClassNamesObj) {
      //   console.log(schemaKey, knob)
      //
      //   return
      // }
      obj[schemaKey] = {
        values: optionsKnob(name, { ...classNameOpts }, (options[schemaKey] && options[schemaKey].values) || [], { display: 'multi-select' }, knob || camelizeString(componentName))
      }
    } else {
      console.log('MISSING', currentSchema)
    }
  })

  return obj
}

export default getKnobComponents
