import Components from '@components'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { useGlobalState } from '../../utils/state/state'
import { closeNavigationDrawers } from '../../utils/state/actions'
import Drawer from '@material-ui/core/Drawer'
import ContentSpace from '../layout/ContentSpace'
import useDeviceDimensions from '../../utils/hooks/useDeviceDimensions'
import { usePageStyles } from './usePageStyle'


const RightDrawerWrap: FunctionComponent = ({ children }) => {
  const classes = usePageStyles()
  const { isMobile } = useDeviceDimensions()
  const [rightIsOpen] = useGlobalState('rightNavigationDrawer')
  return <Drawer variant={isMobile ? 'temporary' : 'permanent'}
                 anchor="right"
                 classes={{
                   paper: classes.rightDrawerPaper,
                   modal: classes.rightModal,
                   paperAnchorDockedRight: classes.rightDocked
                 }}
                 open={isMobile ? rightIsOpen : true}
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
