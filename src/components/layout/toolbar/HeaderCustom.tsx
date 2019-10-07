import {bool, func, object} from 'prop-types'
import SbEditable from 'storyblok-react'
import {ThemeProvider} from '@rmwc/theme'
import TopAppBarWrap from './TopAppBar'
import {toolbar} from '../../../utils/themeContentSection'
import {TopAppBarFixedAdjust} from '@rmwc/top-app-bar'
import LmToolbarRow from './ToolbarRow'
import Divider from '../../Divider'
import React, {useEffect, createRef} from 'react'
import withWindowDimensions from '../../provider/WithWindowDimensions'

const Components = {
  'toolbar_row': LmToolbarRow,
  'divider': Divider
}

const Child = (blok, settings) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], {key: blok._uid, content: blok, settings})
  }
  return React.createElement(() => (
    <div style={{color: 'red'}}>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const HeaderCustom = (props) => {
  const content = props.settings || {}
  let toolbarConfig = content.toolbar_config || []
  const transparentToolbar = props.hasFeature
  const rows = content.multi_toolbar || []
  const color = content.toolbar_variant
  let theme = toolbar.primary
  const toolbarAdjust = createRef()
  if (color) {
    theme = toolbar[color]
  }

  useEffect(
    () => {
      // adjust padding top
      const toolbar = document.querySelector('.lm-toolbar')
      toolbarAdjust.current.style.paddingTop = `${toolbar.clientHeight + 1}px`
    },
    [props.dimensions]
  )


  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        <TopAppBarWrap transparentToolbar={transparentToolbar}
                       toolbarConfig={toolbarConfig}
                       fixed={toolbarConfig.includes('fixed')}>
          {rows.map(p => Child(p, content))}
        </TopAppBarWrap>
      </ThemeProvider>
      {!props.hasFeature && <TopAppBarFixedAdjust ref={toolbarAdjust}/>}
    </SbEditable>
  )
}

HeaderCustom.propTypes = {
  onNav: func,
  settings: object,
  hasFeature: bool
}

export default withWindowDimensions(dimensions => ({dimensions}))(HeaderCustom)
