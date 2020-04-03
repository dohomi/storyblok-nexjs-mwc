import Components from '@components'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { useGlobalState } from '../../utils/state/state'
import { closeNavigationDrawers } from '../../utils/state/actions'
import Drawer from '@material-ui/core/Drawer'
import ContentSpace from '../layout/ContentSpace'
import { usePageStyles } from './usePageStyle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useAppSetup } from '../provider/AppSetupProvider'


const RightDrawerWrap: FunctionComponent = ({ children }) => {
  const classes = usePageStyles()
  const theme = useTheme()
  const appSetup = useAppSetup()
  const matches = useMediaQuery(theme.breakpoints.up(appSetup.rightDrawerMediaBreakpoint || 'sm'))

  // const { isMobile } = useDeviceDimensions()
  const [rightIsOpen] = useGlobalState('rightNavigationDrawer')
  return <Drawer variant={!matches ? 'temporary' : 'permanent'}
                 anchor="right"
                 classes={{
                   paper: classes.rightDrawerPaper,
                   modal: classes.rightModal,
                   paperAnchorDockedRight: classes.rightDocked
                 }}
                 open={!matches ? rightIsOpen : true}
                 onClose={() => closeNavigationDrawers()}>{children}</Drawer>
}

const RightDrawer: FunctionComponent<{
  rightBody: any[]
  body: any[]
}> = ({ rightBody }) => {
  const classes = usePageStyles()
  return (
    <RightDrawerWrap>
      <ContentSpace />
      <div className={classes.rightContent}>
        {rightBody.map((blok) => Components(blok))}
      </div>
    </RightDrawerWrap>
  )
}

export default RightDrawer
