import * as React from 'react'
import { FunctionComponent } from 'react'
import { AppHeaderProps } from './HeaderCustom'
import clsx from 'clsx'
import { toolbar } from '../../../utils/themeContentSection'
import SbEditable from 'storyblok-react'
import { ThemeProvider } from '@rmwc/theme'
import TopAppBarWrap from './TopAppBar'
import { TopAppBarFixedAdjust, TopAppBarNavigationIcon, TopAppBarRow, TopAppBarSection } from '@rmwc/top-app-bar'
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions'
import ToolbarLogo from './ToolbarLogo'
import Components from 'components'

const HeaderSimple: FunctionComponent<AppHeaderProps> = ({ hasFeature, settings, hasRightDrawer }) => {
  const content = settings || {}
  let toolbarConfig = content.toolbar_config || []
  const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm'
  const navRight = content.toolbar || []
  const color = content.toolbar_variant
  const rowClassName = clsx('lm-toolbar-row d-flex justify-content-center', {
    ['mdc-layout-grid--fixed-column-width']: toolbarConfig.includes('fixed_width'),
    ['w-100']: !toolbarConfig.includes('fixed_width')
  })
  let theme = toolbar.primary
  if (color) {
    theme = toolbar[color]
  }

  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        <TopAppBarWrap transparentToolbar={!!hasFeature}
                       toolbarConfig={toolbarConfig}
                       fixed={toolbarConfig.includes('fixed')}>
          <TopAppBarRow>
            <div className={rowClassName}>
              <TopAppBarSection>
                <TopAppBarNavigationIcon icon="menu"
                                         className={`d-${mobileNavBreakpoint}-none`}
                                         onClick={() => toggleLeftNavigation()} />
                <ToolbarLogo settings={content} />
              </TopAppBarSection>
              {!!navRight.length && (
                <TopAppBarSection alignEnd
                                  className={`d-none d-${mobileNavBreakpoint}-inline-flex`}>
                  {navRight.map(blok => Components(blok))}
                </TopAppBarSection>)}
              {!!hasRightDrawer && (
                <TopAppBarSection alignEnd className="d-inline-flex d-sm-none">
                  <TopAppBarNavigationIcon icon="search"
                                           className={`d-${mobileNavBreakpoint}-none`}
                                           onClick={() => toggleRightNavigation()}
                  />
                </TopAppBarSection>
              )}
            </div>
          </TopAppBarRow>
        </TopAppBarWrap>
      </ThemeProvider>
      {!hasFeature && <TopAppBarFixedAdjust />}
    </SbEditable>
  )
}

export default HeaderSimple
