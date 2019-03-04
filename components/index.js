import React from 'react'
import MwcComponents from '../src/components'

// merge all potential components of storyblok. setup components alias in Webpack
const Components = {...MwcComponents}

export default (blok) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], {key: blok._uid, content: blok})
  }
  return React.createElement(() => (
    <div>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}
