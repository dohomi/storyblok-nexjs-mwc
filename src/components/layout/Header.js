import Components from 'components/index'
import {createRef, useEffect, useState} from 'react'
import SbEditable from 'storyblok-react'
import imageService from '../../utils/ImageService'
import clsx from 'clsx'
import {Link} from 'routes/index'
import {
  TopAppBarFixedAdjust,
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from '@rmwc/top-app-bar'

import {ThemeProvider} from '@rmwc/theme'
import {func, object, bool} from 'prop-types'
import withWindowDimensions from '../provider/WithWindowDimensions'
import scrollPositionHook from '../../utils/hooks/scrollPositionHook'
import {toolbar} from '../../utils/themeContentSection'
import {withRouter} from 'next/dist/client/router'

const TopAppBarWrapEl = (props) => {
  const scrollPos = scrollPositionHook()
  const logoTag = props.logoRef && props.logoRef.current
  let [className, setClassName] = useState(getClassName()) // because of server/client hydration
  useEffect(() => {
      setClassName(getClassName(scrollPos))
      if (props.transparentToolbar) {
        // todo website logo inverted only if transparent toolbar
        if (scrollPos > 100) {
          props.websiteLogoInverted && logoTag && (logoTag.src = props.websiteLogo)
        } else {
          props.websiteLogoInverted && logoTag && (logoTag.src = props.websiteLogoInverted)
        }
      }
    },
    [scrollPos, props.transparentToolbar]
  )

  function getClassName (pos) {
    return clsx('lm-toolbar', {
      ['lm-toolbar__bold-text']: !!props.toolbarConfig.includes('text_bold'),
      ['lm-toolbar__fixed-width']: !!props.toolbarConfig.includes('fixed_width'),
      ['lm-toolbar-transparent']: props.transparentToolbar && pos < 100
    })
  }

  return (
    <TopAppBar className={className} fixed={props.fixed}>
      {props.children}
    </TopAppBar>
  )
}


const TopAppBarWrap = withWindowDimensions(dimensions => ({dimensions}))(withRouter(TopAppBarWrapEl))

const Header = (props) => {
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

Header.propTypes = {
  onNav: func,
  settings: object,
  hasFeature: bool
}

export default Header
