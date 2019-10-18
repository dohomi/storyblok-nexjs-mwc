import { Drawer, DrawerAppContent, DrawerContent } from '@rmwc/drawer'
import Components from 'components'
import { FunctionComponent } from 'react'
import * as React from 'react'

const PageWithDrawer: FunctionComponent<{
  rightBody: any[]
  body: any[]
}> = ({ rightBody, body }) => {
  return (
    <>
      <Drawer dismissible
              open={true}
              dir="rtl"
              style={{ zIndex: 3 }}
      >
        <DrawerContent dir="ltr">
          {rightBody.map((blok) => Components(blok))}
        </DrawerContent>
      </Drawer>
      <DrawerAppContent dir="rtl" tag="main">
        <div dir="ltr">
          {body.map((blok) => Components(blok))}
        </div>
      </DrawerAppContent>
    </>
  )
}

export default PageWithDrawer
