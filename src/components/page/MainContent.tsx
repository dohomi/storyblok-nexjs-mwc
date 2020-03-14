import Components from '@components'
import React, { FunctionComponent } from 'react'
import { usePageStyles } from './usePageStyle'
import clsx from 'clsx'
import { useGlobalState } from '../../utils/state/state'

const MainContent: FunctionComponent<{
  body: any[]
}> = ({ body }) => {
  const classes = usePageStyles()
  const [appSetup] = useGlobalState('appSetup')
  return <main className={clsx({
      [classes.contentWithRight]: appSetup.hasRightDrawer
    }
  )}>{body.map((blok) => Components(blok))}</main>
}

export default MainContent
