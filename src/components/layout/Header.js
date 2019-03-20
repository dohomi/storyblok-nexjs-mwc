import Components from 'components/index'
import {memo, createRef} from 'react'
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
import {useEffect} from 'react'
import {toolbar} from '../../utils/themeContentSection'
import {withRouter} from 'next/dist/client/router'

const Header = (props) => {
  const content = props.settings || {}
  let toolbarConfig = content.toolbar_config || []
  const transparentToolbar = props.hasFeature
  const refResizeObserver = createRef()
  let currentToolbar = null
  let currentLogo = null
  const width = props.dimensions.width
  const height = props.dimensions.height
  const logoRef = createRef()
  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo && imageService(content.website_logo, '0x' + 48 * 2)
  const websiteLogoInverted = content.website_logo_invert && imageService(content.website_logo_invert, '0x' + 48 * 2)
  const onInteractionChanged = () => {
    const scrollPos = window.pageYOffset
    const logoTag = logoRef.current || currentLogo
    if (transparentToolbar) {
      const el = (refResizeObserver.current && refResizeObserver.current.parentElement) || currentToolbar
      if (!el) {
        console.log('el not defined', currentToolbar)
        return
      }

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
  }

  useEffect(() => {
    currentToolbar = refResizeObserver.current && refResizeObserver.current.parentElement
    currentLogo = logoRef && logoRef.current
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        onInteractionChanged()
      })
    }
    window.addEventListener(
      'scroll',
      handleScroll,
      window.hasPassiveListenerSupport ? {passive: true} : false
    )
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  useEffect(() => {
    onInteractionChanged()
  }, [width, height, props.router.asPath, transparentToolbar])

  const navRight = content.toolbar || []
  const color = content.toolbar_variant
  let theme = toolbar.primary
  if (color) {
    theme = toolbar[color]
  }

  const topToolbarClasses = clsx('lm-toolbar', {
    'lm-toolbar-transparent': transparentToolbar,
    ['lm-toolbar__bold-text']: !!toolbarConfig.includes('text_bold'),
    ['lm-toolbar__fixed-width']: !!toolbarConfig.includes('fixed_width')
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
                  {!websiteLogo && (
                    <TopAppBarTitle>
                      {websiteTitle}
                    </TopAppBarTitle>
                  )}
                  {websiteLogo &&
                  <img src={websiteLogo}
                       height="56"
                       className="img-fluid"
                       alt={websiteTitle || 'website logo'}
                       ref={logoRef}/>}
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

export default memo(withWindowDimensions(dimensions => ({dimensions}))(withRouter(Header)))
