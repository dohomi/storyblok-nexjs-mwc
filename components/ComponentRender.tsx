import React from 'react'
import MwcComponents from '../src/components/all_components'

type MwcComponents = {
  [k: string]: any
}
// merge all potential components of storyblok. setup components alias in Webpack
let Components: MwcComponents = { ...MwcComponents }

export default (blok: any) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], { key: blok._uid, content: blok })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>
  ), { key: blok._uid })
}
