import Components from 'components/index'
import React from 'react'
import SbEditable from 'storyblok-react'
import imageService from '../utils/ImageService'
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

import scrollPositionHook from '../utils/hooks/scrollPositionHook'
import {toolbar} from '../utils/themes'

const Header = (props) => {
  const [refResizeObserver, width, height] = useResizeObserver()
  const scrollPos = scrollPositionHook()

  useEffect(() => {
    const el = refResizeObserver.current.parentElement
      if (scrollPos > 100) {
        el.classList.remove('lm-toolbar-transparent')
      } else {
        el.classList.add('lm-toolbar-transparent')
      }
  }, [width, height, scrollPos])

  const content = props.settings || {}
  const navRight = content.toolbar || []
  const color = content.toolbar_variant
  let theme = toolbar.primary
  if (color) {
    theme = toolbar[color]
  }

  const websiteTitle = content.website_title
  const websiteLogo = content.website_logo
  const transparentToolbar = props.hasFeature
  const topToolbarClasses = clsx('lm-app-toolbar', {
    'lm-toolbar-transparent': transparentToolbar
  })
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        <TopAppBar fixed className={topToolbarClasses}>
          <TopAppBarRow ref={refResizeObserver}>
            <TopAppBarSection>
              <TopAppBarNavigationIcon icon="menu" className="d-sm-none"
                                       onClick={() => props.onNav()}/>
              <Link route="/">
                <a>
                  <TopAppBarTitle>
                    {!websiteLogo && websiteTitle}
                    {websiteLogo &&
                    <img src={imageService(websiteLogo, '0x128')} height="56" alt={websiteTitle || 'website logo'}/>}
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
/*
class Header extends React.Component {

  constructor (props) {
    super(props)
    this.calculateStickyState = this.calculateStickyState.bind(this)
    this.topToolbar = React.createRef()
  }

  componentDidUpdate (prevProps) {
    if (this.props.hasFeature) {
      this.initialise()
    } else {
      this._callDetach()
    }
  }

  componentDidMount () {
    this.props.hasFeature && this.initialise()
  }

  componentWillUnmount () {
    this._callDetach()
  }

  _callDetach () {
    typeof this._detatch === 'function' && this._detatch()
  }

  calculateStickyState () {
    if (this._rafExecuting) {
      return
    }

    this._rafExecuting = true
    const el = document.querySelector('.lm-app-toolbar')
    window.requestAnimationFrame(() => {
      const pageYOffset = window.pageYOffset
      if (pageYOffset > 64) {
        el.classList.remove('lm-toolbar-transparent')
      } else {
        el.classList.add('lm-toolbar-transparent')
      }
      this._rafExecuting = false
    })


  }

  onResize = () => {
    // We want to check if because of a resize the header is now sticky or not.
    this.calculateStickyState()
  }

  initialise () {
    if (this._initialised) {
      return
    }

    const detatchScroll = addEvent('scroll', this.calculateStickyState)
    const detatchResize = addEvent('resize', this.onResize)

    this._detatch = () => {
      [detatchScroll, detatchResize].forEach((detatch) => detatch())
      this._initialised = false
    }

    this.calculateStickyState()
    this._initialised = true
  }

  render () {
    const content = this.props.settings || {}
    const navRight = content.toolbar || []
    const color = content.toolbar_variant
    let theme = toolbar.primary
    if (color) {
      theme = toolbar[color]
    }

    const websiteTitle = content.website_title
    const websiteLogo = content.website_logo
    const transparentToolbar = this.props.hasFeature
    const topToolbarClasses = clsx('lm-app-toolbar', {
      'lm-toolbar-transparent': transparentToolbar
    })
    return (
      <SbEditable content={content}>
        <ThemeProvider options={theme}>
          <TopAppBar fixed className={topToolbarClasses}>
            <TopAppBarRow>
              <TopAppBarSection>
                <TopAppBarNavigationIcon icon="menu" className="d-sm-none"
                                         onClick={() => this.props.onNav()}/>
                <Link route="/">
                  <a>
                    <TopAppBarTitle>
                      {!websiteLogo && websiteTitle}
                      {websiteLogo &&
                      <img src={imageService(websiteLogo, '0x128')} height="56" alt={websiteTitle || 'website logo'}/>}
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
        {!this.props.hasFeature && <TopAppBarFixedAdjust/>}
      </SbEditable>
    )
  }
}
*/
Header.propTypes = {
  onNav: func,
  settings: object,
  hasFeature: bool
}

export default Header
