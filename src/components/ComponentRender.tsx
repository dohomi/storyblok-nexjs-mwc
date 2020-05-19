import React from 'react'
import * as MwcComponents from './all_components'

console.log(MwcComponents)

// type MwcComponents = {
//   [k: string]: any
// }
// merge all potential components of storyblok. setup components alias in Webpack
// const Components: MwcComponents = { ...MwcComponents }


export default function LmComponentRender(blok: any) {
  console.log('hier', blok)
  if (typeof MwcComponents[blok.component] !== 'undefined') {
    return React.createElement(MwcComponents[blok.component], { key: blok._uid, content: blok })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>
  ), { key: blok._uid })
}

