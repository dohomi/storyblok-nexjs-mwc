import SbEditable from 'storyblok-react'
import {TopAppBarRow} from '@rmwc/top-app-bar'
import ToolbarSection from './ToolbarSection'
import clsx from 'clsx'

const ToolbarRow = ({content, settings}) => {
  const body = content.body || []
  let toolbarConfig = settings.toolbar_config || []
  const className = clsx(content.class_names && content.class_names.values)
  const childClassName = clsx('lm-toolbar-row d-flex justify-content-center', {
    ['mdc-layout-grid--fixed-column-width']: !!toolbarConfig.includes('fixed_width'),
    ['w-100']: !toolbarConfig.includes('fixed_width')
  })

  console.log(className)
  return (
    <SbEditable content={content}>
      <TopAppBarRow className={className}>
        <div className={childClassName}>
          {body.map(p => <ToolbarSection {...p} settings={settings} key={p._uid}/>)}
        </div>
      </TopAppBarRow>
    </SbEditable>
  )
}
export default ToolbarRow
