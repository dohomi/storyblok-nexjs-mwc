import SbEditable from 'storyblok-react'
import ToolbarSection from './ToolbarSection'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { GlobalStoryblok, ToolbarRowStoryblok } from '../../../typings/generated/components-schema'
import clsx from 'clsx'
import Container, { ContainerProps } from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const ToolbarRow: FunctionComponent<{ content: ToolbarRowStoryblok, settings: GlobalStoryblok }> = ({ content, settings }) => {
  const body = content.body || []
  // let toolbarConfig = settings.toolbar_config || []
  // const childClassName = clsx('lm-toolbar-row d-flex justify-content-center', {
  //   ['mdc-layout-grid--fixed-column-width']: toolbarConfig.includes('fixed_width'),
  //   ['w-100']: !toolbarConfig.includes('fixed_width')
  // })


  if (content.is_system_bar) {
    const toolbarConfig = settings.toolbar_config || []
    let toolbarWidth: ContainerProps['maxWidth'] = false
    if (toolbarConfig.includes('fixed_width')) {
      toolbarWidth = settings.theme_container_width && settings.theme_container_width !== 'none' ? settings.theme_container_width : 'lg'
    }
    return (
      <div className={clsx('lm-system-bar', 'bg-primary')}>
        <Container className="h-100" maxWidth={toolbarWidth as ContainerProps['maxWidth']}>
          <Grid container className="h-100" justify={content.justify} alignContent={'center'} alignItems={'center'}>
            {body.map(p => <ToolbarSection content={p} settings={settings} key={p._uid} />)}
          </Grid>
        </Container>
      </div>
    )
  }

  return (
    <SbEditable content={content}>
      <Grid container justify={content.justify} className="h-100" alignItems={'center'}>
        {body.map(p => <ToolbarSection content={p} settings={settings} key={p._uid} />)}
      </Grid>
    </SbEditable>
  )
}
export default ToolbarRow
