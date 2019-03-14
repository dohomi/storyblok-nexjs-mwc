import Components from 'components/index'
import React from 'react'
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
import useResizeObserver from 'use-resize-observer'
import {useEffect} from 'react'

import scrollPositionHook from '../../utils/hooks/scrollPositionHook'
import {toolbar} from '../../utils/themeContentSection'
import {withRouter} from 'next/dist/client/router'

const Header = (props) => {
  const content = props.settings || {}
  let toolbarConfig = content.toolbar_config || []
  const transparentToolbar = props.hasFeature
  const [refResizeObserver, width, height] = useResizeObserver()
  const logoRef = React.createRef()
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo && imageService(content.website_logo, '0x128')
  const websiteLogoInverted = content.website_logo_invert && imageService(content.website_logo_invert, '0x128')

  const scrollPos = scrollPositionHook()

  useEffect(() => {
    const logoTag = logoRef.current
    if (transparentToolbar) {
      const el = refResizeObserver.current.parentElement
      if (scrollPos > 100) {
        el.classList.remove('lm-toolbar-transparent')
        websiteLogoInverted && (logoTag.src = websiteLogo)
      } else {
        el.classList.add('lm-toolbar-transparent')
        websiteLogoInverted && (logoTag.src = websiteLogoInverted)
      }
    } else {
      websiteLogo && (logoTag.src = websiteLogo)
    }
  }, [width, height, scrollPos, props.router.asPath, transparentToolbar])

  const navRight = content.toolbar || []
  const color = content.toolbar_variant
  let theme = toolbar.primary
  if (color) {
    theme = toolbar[color]
  }

  const topToolbarClasses = clsx('lm-app-toolbar', {
    'lm-toolbar-transparent': transparentToolbar
  })
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        <TopAppBar className={topToolbarClasses} fixed={toolbarConfig.includes('fixed')}>
          <TopAppBarRow ref={refResizeObserver}>
            <TopAppBarSection>
              <TopAppBarNavigationIcon icon="menu" className="d-sm-none"
                                       onClick={() => props.onNav()}/>
              <Link route="/">
                <a className="lm-logo-header">
                  <TopAppBarTitle>
                    {!websiteLogo && websiteTitle}
                    {websiteLogo &&
                    <img src={websiteLogo}
                         height="56"
                         className="img-fluid"
                         alt={websiteTitle || 'website logo'}
                         ref={logoRef}/>}
                  </TopAppBarTitle>
                </a>
              </Link>
            </TopAppBarSection>
            {navRight.length && (
              <TopAppBarSection alignEnd
                                className="d-none d-sm-inline-flex">
                {navRight.map(blok => Components(blok))}
              </TopAppBarSection>)}
          </TopAppBarRow>
        </TopAppBar>
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

export default withRouter(Header)
