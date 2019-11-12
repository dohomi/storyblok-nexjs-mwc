import * as React from 'react'
import { FunctionComponent } from 'react'
import SbEditable from 'storyblok-react'
import TopAppBarWrap, { AppHeaderProps } from './TopAppBar'
import { toggleLeftNavigation, toggleRightNavigation } from '../../../utils/state/actions'
import ToolbarLogo from './ToolbarLogo'
import Components from '@components'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'

const HeaderSimple: FunctionComponent<AppHeaderProps> = (props) => {
const  {  settings, hasRightDrawer } = props
  const content = settings || {}
  const mobileNavBreakpoint = content.mobile_nav_breakpoint || 'sm'
  const navRight = content.toolbar || []

  return (
    <SbEditable content={content}>
      <TopAppBarWrap {...props}>
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
    </SbEditable>
  )
}

export default HeaderSimple
