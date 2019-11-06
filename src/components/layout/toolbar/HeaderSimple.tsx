import * as React from 'react'
import { FunctionComponent } from 'react'
import { AppHeaderProps } from './HeaderCustom'
import SbEditable from 'storyblok-react'
import TopAppBarWrap from './TopAppBar'
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions'
import ToolbarLogo from './ToolbarLogo'
import Components from '@components'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'

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
        <IconButton className={`${mobileNavBreakpoint}-none`}
                    onClick={() => toggleLeftNavigation()}>
          <Icon>menu</Icon>
        </IconButton>
        <ToolbarLogo settings={content} />

        {navRight.length > 0 && (
          <Grid container
                className={clsx('lm-toolbar__section', 'display-none', { [`${mobileNavBreakpoint}-inline-flex`]: true })}>
            {navRight.map(blok => Components(blok))}
          </Grid>
        )}
        {!!hasRightDrawer && (
          <Grid container className={clsx('lm-toolbar__section', {
            [`${mobileNavBreakpoint}-none`]: true
          })}>
            <IconButton onClick={() => toggleRightNavigation()}>
              <Icon>search</Icon>
            </IconButton>
          </Grid>
        )}
      </TopAppBarWrap>
      {!hasFeature && <div className={'space_content'} />}
    </SbEditable>
  )
}

export default HeaderSimple
