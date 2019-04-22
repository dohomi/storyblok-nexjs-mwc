import {bool, func, object} from 'prop-types'
import SbEditable from 'storyblok-react'
import {ThemeProvider} from '@rmwc/theme'
import TopAppBarWrap from './TopAppBar'
import {toolbar} from '../../../utils/themeContentSection'
import {TopAppBarFixedAdjust} from '@rmwc/top-app-bar'
import ToolbarRow from './ToolbarRow'

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
          {rows.map(p => <ToolbarRow {...p} settings={content} key={p._uid}/>)}
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
