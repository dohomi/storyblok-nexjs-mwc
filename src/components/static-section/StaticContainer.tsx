import Components from '@components'
import { StaticContainerStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import { FunctionComponent } from 'react'
import SbEditable from 'storyblok-react'

const StaticContainer: FunctionComponent<{ content: StaticContainerStoryblok }> = ({ content }) => {

  const body = content.body || []

  return (
    <SbEditable content={content}>
      <div className="lm-static-container">
        {body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default StaticContainer
