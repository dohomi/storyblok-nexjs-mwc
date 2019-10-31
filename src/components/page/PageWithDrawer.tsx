import Components from '@components'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { useGlobalState } from '../../utils/state/state'
import { closeNavigationDrawers } from '../../utils/state/actions'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const drawerWidth = 254

const useStyles = makeStyles({
  docked: {
    width: drawerWidth
  },
  content: {
    marginRight: drawerWidth,
    '&.lm-main__mobile': {
      marginRight: 0
    }
  }
})

const PageWithDrawer: FunctionComponent<{
  rightBody: any[]
  body: any[]
}> = ({ rightBody, body }) => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const [rightIsOpen] = useGlobalState('rightNavigationDrawer')
  const isDrawerModal = width < 600
  return (
    <>
      <Drawer variant={isDrawerModal ? 'temporary' : 'permanent'}
              anchor="right"
              classes={{ paperAnchorDockedRight: classes.docked }}
              open={isDrawerModal ? rightIsOpen : true}
              onClose={() => closeNavigationDrawers()}
      >
        <>
          {rightBody.map((blok) => Components(blok))}
        </>
      </Drawer>
      <main className={clsx(classes.content, { 'lm-main__mobile': isDrawerModal })}>
        {body.map((blok) => Components(blok))}
      </main>
    </>
  )
}

export default PageWithDrawer
