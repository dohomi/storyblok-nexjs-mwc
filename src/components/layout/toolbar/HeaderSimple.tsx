import * as React from 'react'
import { FunctionComponent } from 'react'
import SbEditable from 'storyblok-react'
import TopAppBarWrap, { AppHeaderProps } from './TopAppBar'
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions'
import ToolbarLogo from './ToolbarLogo'
import Components from '@components'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import { Magnify, Menu } from 'mdi-material-ui'

const HeaderSimple: FunctionComponent<AppHeaderProps> = (props) => {
  const { settings, hasRightDrawer } = props
  const content = settings || {}
  const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm'
  const navRight = content.toolbar || []

  return (
    <SbEditable content={content}>
      <TopAppBarWrap {...props}>
        <IconButton className={`d-inline-flex d-${mobileNavBreakpoint}-none`}
                    onClick={() => toggleLeftNavigation()}>
          <Menu />
        </IconButton>
        <ToolbarLogo settings={content} />

        {navRight.length > 0 && (
          <Grid container
                className={clsx('lm-toolbar__section', 'd-none', { [`d-${mobileNavBreakpoint}-inline-flex`]: true })}>
            {navRight.map(blok => Components(blok))}
          </Grid>
        )}
        {!!hasRightDrawer && (
          <Grid container className={clsx('lm-toolbar__section', {
            [`d-${mobileNavBreakpoint}-none`]: true
          })}>
            <IconButton onClick={() => toggleRightNavigation()}>
              <Magnify />
            </IconButton>
          </Grid>
        )}
      </TopAppBarWrap>
    </SbEditable>
  )
}

export default HeaderSimple
