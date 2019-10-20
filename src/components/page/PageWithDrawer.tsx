import { Drawer, DrawerAppContent, DrawerContent } from '@rmwc/drawer'
import Components from 'components'
import * as React from 'react'
import { FunctionComponent } from 'react'

const PageWithDrawer: FunctionComponent<{
  rightBody: any[]
  body: any[]
}> = ({ rightBody, body }) => {
  return (
    <div className="page-with-drawer">
      <Drawer dismissible
              open={true}
              className="right-align"
      >
        <DrawerContent>
          {rightBody.map((blok) => Components(blok))}
        </DrawerContent>
      </Drawer>
      <DrawerAppContent tag="main" className="left-align">
        {body.map((blok) => Components(blok))}
      </DrawerAppContent>
    </div>
  )
}

export default PageWithDrawer
