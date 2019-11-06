import SbEditable from 'storyblok-react'
import ToolbarSection from './ToolbarSection'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { GlobalStoryblok, ToolbarRowStoryblok } from '../../../typings/generated/components-schema'

const ToolbarRow: FunctionComponent<{ content: ToolbarRowStoryblok, settings: GlobalStoryblok }> = ({ content, settings }) => {
  const body = content.body || []
  // let toolbarConfig = settings.toolbar_config || []
  // const childClassName = clsx('lm-toolbar-row d-flex justify-content-center', {
  //   ['mdc-layout-grid--fixed-column-width']: toolbarConfig.includes('fixed_width'),
  //   ['w-100']: !toolbarConfig.includes('fixed_width')
  // })

  return (
    <SbEditable content={content}>
      <div style={{flex:1}}>
        {body.map(p => <ToolbarSection content={p} settings={settings} key={p._uid} />)}
      </div>
    </SbEditable>
  )
}
export default ToolbarRow
