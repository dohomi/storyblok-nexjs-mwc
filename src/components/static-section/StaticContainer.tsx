import Components from '@components'
import { StaticContainerStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import SbEditable from 'storyblok-react'

export type LmStaticContainerProps = { content: StaticContainerStoryblok }

export function LmStaticContainer({ content }: LmStaticContainerProps): JSX.Element {
  return (
    <SbEditable content={content}>
      <div className="lm-static-container">
        {(content.body || []).map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}
