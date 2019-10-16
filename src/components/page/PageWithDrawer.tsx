import { Drawer, DrawerAppContent, DrawerContent } from '@rmwc/drawer'
import Components from 'components'
import { FunctionComponent } from 'react'

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
          <div style={{ position: 'fixed' }}>
            {rightBody.map((blok) => Components(blok))}
          </div>
        </DrawerContent>
      </Drawer>
      <DrawerAppContent dir="rtl">
        <div dir="ltr">
          {body.map((blok) => Components(blok))}
        </div>
      </DrawerAppContent>
    </>
  )
}

export default PageWithDrawer
