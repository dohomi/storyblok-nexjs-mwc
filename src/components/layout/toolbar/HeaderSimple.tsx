import * as React from 'react'
import { FunctionComponent } from 'react'
import { AppHeaderProps } from './HeaderCustom'
import SbEditable from 'storyblok-react'
import TopAppBarWrap from './TopAppBar'
// import { TopAppBarFixedAdjust, TopAppBarNavigationIcon, TopAppBarSection } from '@rmwc/top-app-bar'
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions'
import ToolbarLogo from './ToolbarLogo'
import Components from '@components'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'

const HeaderSimple: FunctionComponent<AppHeaderProps> = ({ hasFeature, settings, hasRightDrawer }) => {
  const content = settings || {}
  let toolbarConfig = content.toolbar_config || []
  const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm'
  const navRight = content.toolbar || []
  // const rowClassName = clsx('lm-toolbar-row d-flex justify-content-center', {
  //   ['mdc-layout-grid--fixed-column-width']: toolbarConfig.includes('fixed_width'),
  //   ['w-100']: !toolbarConfig.includes('fixed_width')
  // })
  //

  return (
    <SbEditable content={content}>
      <TopAppBarWrap transparentToolbar={!!hasFeature}
                     toolbarConfig={toolbarConfig}
                     variant={content.toolbar_variant}
                     fixed={toolbarConfig.includes('fixed')}>
        <IconButton className={`d-${mobileNavBreakpoint}-none`}
                    onClick={() => toggleLeftNavigation()}>
          <Icon>menu</Icon>
        </IconButton>
        <ToolbarLogo settings={content} />

        {navRight.length > 0 && (
          <Box justifyContent="flex-end"
               flex={1}
               display={{
                 xs: 'none',
                 [mobileNavBreakpoint]: 'inline-flex'
               }}>
            {navRight.map(blok => Components(blok))}
          </Box>)}
        {!!hasRightDrawer && (
          <Box display={{
            xs: 'inline-flex',
            [mobileNavBreakpoint]: 'none'
          }}>
            <IconButton onClick={() => toggleRightNavigation()}>
              <Icon>search</Icon>
            </IconButton>
          </Box>
        )}
      </TopAppBarWrap>
      {!hasFeature && <div className={'space_content'} />}
    </SbEditable>
  )
}

export default HeaderSimple
