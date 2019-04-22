import {bool, func, object} from 'prop-types'
import SbEditable from 'storyblok-react'
import {ThemeProvider} from '@rmwc/theme'
import TopAppBarWrap from './TopAppBar'
import {toolbar} from '../../../utils/themeContentSection'
import {TopAppBarFixedAdjust} from '@rmwc/top-app-bar'
import ToolbarRow from './ToolbarRow'
import Divider from '../../Divider'
import React from 'react'

const LmToolbarRow = ({content, settings}) => {
  return (
    <SbEditable content={content}>
      <ToolbarRow {...content} settings={settings}/>
    </SbEditable>
  )
}

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
  if (color) {
    theme = toolbar[color]
  }
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        <TopAppBarWrap transparentToolbar={transparentToolbar}
                       toolbarConfig={toolbarConfig}
                       fixed={toolbarConfig.includes('fixed')}>
          {rows.map(p => Child(p, content))}
        </TopAppBarWrap>
      </ThemeProvider>
      {!props.hasFeature && <TopAppBarFixedAdjust/>}
    </SbEditable>
  )
}

HeaderCustom.propTypes = {
  onNav: func,
  settings: object,
  hasFeature: bool
}

export default HeaderCustom
