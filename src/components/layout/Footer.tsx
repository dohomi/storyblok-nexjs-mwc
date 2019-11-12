import Components from '@components'
import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'

const Footer: FunctionComponent<{ settings: GlobalStoryblok }> = ({ settings }) => {
  const content = settings && settings.footer || []
  return (
    <SbEditable content={settings}>
      <footer>
        {content.map((blok) => Components(blok))}
      </footer>
    </SbEditable>
  )
}

export default Footer
