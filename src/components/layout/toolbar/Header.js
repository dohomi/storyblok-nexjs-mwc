import Components from 'components/index'
import {createRef} from 'react'
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

const HeaderSimple = (props) => {
  const content = props.settings || {}
  let toolbarConfig = content.toolbar_config || []
  const transparentToolbar = props.hasFeature
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo && imageService(content.website_logo, '0x' + 48 * 2)
  const websiteLogoInverted = content.website_logo_invert && imageService(content.website_logo_invert, '0x' + 48 * 2)
  const currentLogoSrc = transparentToolbar && websiteLogoInverted ? websiteLogoInverted : websiteLogo
  const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm'

  const logoRef = createRef()

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
                       websiteLogo={websiteLogo}
                       toolbarConfig={toolbarConfig}
                       websiteLogoInverted={websiteLogoInverted}
                       fixed={toolbarConfig.includes('fixed')}
                       logoRef={logoRef}>
          <TopAppBarRow>
            <TopAppBarSection>
              <TopAppBarNavigationIcon icon="menu" className={`d-${mobileNavBreakpoint}-none`}
                                       onClick={() => props.onNav()}/>
              <Link route="/">
                <a className="lm-logo-header">
                  {!websiteLogo && (
                    <TopAppBarTitle>
                      {websiteTitle}
                    </TopAppBarTitle>
                  )}
                  {websiteLogo &&
                  <img src={currentLogoSrc}
                       height="56"
                       className="img-fluid"
                       alt={websiteTitle || 'website logo'}
                       ref={logoRef}/>}
                </a>
              </Link>
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
