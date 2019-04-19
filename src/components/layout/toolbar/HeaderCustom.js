import {bool, func, object} from 'prop-types'
import SbEditable from 'storyblok-react'
import {ThemeProvider} from '@rmwc/theme'
import TopAppBarWrap from './TopAppBar'
import imageService from '../../../utils/ImageService'
import {toolbar} from '../../../utils/themeContentSection'
import {TopAppBarFixedAdjust} from '@rmwc/top-app-bar'
import ToolbarRow from './ToolbarRow'

const HeaderCustom = (props) => {
  const content = props.settings || {}
  let toolbarConfig = content.toolbar_config || []
  const transparentToolbar = props.hasFeature
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo && imageService(content.website_logo, '0x' + 48 * 2)
  const websiteLogoInverted = content.website_logo_invert && imageService(content.website_logo_invert, '0x' + 48 * 2)
  const currentLogoSrc = transparentToolbar && websiteLogoInverted ? websiteLogoInverted : websiteLogo
  const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm'

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
                       websiteLogo={websiteLogo}
                       toolbarConfig={toolbarConfig}
                       websiteLogoInverted={websiteLogoInverted}
                       fixed={toolbarConfig.includes('fixed')}>
          {rows.map(p => <ToolbarRow {...p} key={p._uid}/>)}
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
