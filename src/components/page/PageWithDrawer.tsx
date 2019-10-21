import { Drawer, DrawerAppContent, DrawerContent } from '@rmwc/drawer'
import Components from 'components'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { useGlobalState } from '../../utils/state/state'
import { closeNavigationDrawers } from '../../utils/state/actions'

const PageWithDrawer: FunctionComponent<{
  rightBody: any[]
  body: any[]
}> = ({ rightBody, body }) => {
  const { width } = useWindowDimensions()
  const [rightIsOpen] = useGlobalState('rightNavigationDrawer')

  console.log('WIDTH', width)

  const isDrawerModal = width < 600
  return (
    <>
      <Drawer dismissible={!isDrawerModal}
              dir="rtl"
              modal={isDrawerModal}
              open={isDrawerModal ? rightIsOpen : true}
              className="right-align"
              onClose={() => closeNavigationDrawers()}
      >
        <DrawerContent>
          {rightBody.map((blok) => Components(blok))}
        </DrawerContent>
      </Drawer>
      <DrawerAppContent tag="main" className="left-align">
        {body.map((blok) => Components(blok))}
      </DrawerAppContent>
    </>
  )
}

export default PageWithDrawer
