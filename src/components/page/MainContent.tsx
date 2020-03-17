import Components from '@components'
import React, { FunctionComponent } from 'react'
import { usePageStyles } from './usePageStyle'
import clsx from 'clsx'
import { useGlobalState } from '../../utils/state/state'

const MainContenWrap: FunctionComponent = ({ children }) => {
  const classes = usePageStyles()
  const [appSetup] = useGlobalState('appSetup')
  const [isOpen] = useGlobalState('leftNavigationDrawer')
  return <main
    className={clsx(classes.content, {
        [classes.contentWithRight]: appSetup.hasRightDrawer,
        [classes.leftShift]: appSetup.drawerVariant !== 'temporary' && isOpen
      }
    )}>{children}</main>
}

const MainContent: FunctionComponent<{
  body: any[]
}> = ({ body }) => (<MainContenWrap>{body.map((blok) => Components(blok))}</MainContenWrap>)


export default MainContent
