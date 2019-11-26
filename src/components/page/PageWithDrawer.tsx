import Components from '@components'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { useGlobalState } from '../../utils/state/state'
import { closeNavigationDrawers } from '../../utils/state/actions'
import Drawer from '@material-ui/core/Drawer'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import ContentSpace from '../layout/ContentSpace'
import useDeviceDimensions from '../../utils/hooks/useDeviceDimensions'

const drawerWidth = 254

const useStyles = makeStyles((theme: Theme) => createStyles({
  docked: {
    width: drawerWidth,
    zIndex: theme.zIndex.appBar - 1
  },
  modal: {
    '& .lm-content-space': {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    padding: theme.spacing(2)
  },
  rightContent: {
    overflowY: 'auto'
  },
  content: {
    marginRight: drawerWidth,
    '&.lm-main__mobile': {
      marginRight: 0
    }
  }
}))

const PageWithDrawer: FunctionComponent<{
  rightBody: any[]
  body: any[]
}> = ({ rightBody, body }) => {
  const classes = useStyles()
  const { isMobile } = useDeviceDimensions()
  const [rightIsOpen] = useGlobalState('rightNavigationDrawer')
  const isDrawerModal = isMobile
  return (
    <>
      <Drawer variant={isDrawerModal ? 'temporary' : 'permanent'}
              anchor="right"
              classes={{
                paper: classes.drawerPaper,
                modal: classes.modal,
                paperAnchorDockedRight: classes.docked
              }}
              open={isDrawerModal ? rightIsOpen : true}
              onClose={() => closeNavigationDrawers()}
      >
        <>
          <ContentSpace />
          <div className={classes.rightContent}>
            {rightBody.map((blok) => Components(blok))}
          </div>
        </>
      </Drawer>
      <main className={clsx(classes.content, { 'lm-main__mobile': isDrawerModal })}>
        {body.map((blok) => Components(blok))}
      </main>
    </>
  )
}

export default PageWithDrawer
