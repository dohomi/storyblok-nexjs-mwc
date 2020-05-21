import { default as ComponentRender } from 'lumen-cms-core'
import React from 'react'
import SbEditable from 'storyblok-react'

export function LmStoryblokComponentRender(props, i): JSX.Element {
  const { content, ...rest } = props
  return (
    <SbEditable content={content} key={`${content.component}_${i}`}>
      {ComponentRender({ content, ...rest })}
    </SbEditable>
  )
}
