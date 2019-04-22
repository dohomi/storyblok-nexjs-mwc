import Components from 'components/index'
import SbEditable from 'storyblok-react'
import imageService from '../../../utils/ImageService'
import {Link} from 'routes/index'
import {
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from '@rmwc/top-app-bar'

import {ThemeProvider} from '@rmwc/theme'
import {func, object, bool} from 'prop-types'
import {toolbar} from '../../../utils/themeContentSection'
import TopAppBarWrap from './TopAppBar'
import HeaderCustom from './HeaderCustom'
import {toggleLeftNavigation} from '../../../utils/state/state'
import ToolbarLogo from './ToolbarLogo'

const HeaderSimple = (props) => {
  const content = props.settings || {}
  let toolbarConfig = content.toolbar_config || []
  const transparentToolbar = props.hasFeature
  const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm'
  const navRight = content.toolbar || []
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
          <TopAppBarRow>
            <TopAppBarSection>
              <TopAppBarNavigationIcon icon="menu"
                                       className={`d-${mobileNavBreakpoint}-none`}
                                       onClick={toggleLeftNavigation}/>
              <ToolbarLogo settings={content}/>
            </TopAppBarSection>
            {!!navRight.length && (
              <TopAppBarSection alignEnd
                                className={`d-none d-${mobileNavBreakpoint}-inline-flex`}>
                {navRight.map(blok => Components(blok))}
              </TopAppBarSection>)}
          </TopAppBarRow>
        </TopAppBarWrap>
      </ThemeProvider>
      {!props.hasFeature && <TopAppBarFixedAdjust/>}
    </SbEditable>
  )
}

HeaderSimple.propTypes = {
  onNav: func,
  settings: object,
  hasFeature: bool
}

const Header = (props) => {
  const content = props.settings || {}
  if (content.multi_toolbar && content.multi_toolbar.length) {
    return <HeaderCustom {...props}/>
  }
  return <HeaderSimple {...props}/>
}


export default Header
