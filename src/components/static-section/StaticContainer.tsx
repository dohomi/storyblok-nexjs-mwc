import { StaticContainerStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type LmStaticContainerProps = CoreComponentProps & { content: StaticContainerStoryblok }

export function LmStaticContainer({ content, ComponentRender }: LmStaticContainerProps): JSX.Element {
  return (
    <div className="lm-static-container">
      {(content.body || []).map((blok, i) => ComponentRender({ content: blok }, i))}
    </div>
  )
}
