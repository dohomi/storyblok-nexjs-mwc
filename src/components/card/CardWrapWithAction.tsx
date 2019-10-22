import SbEditable from 'storyblok-react'
import { Card } from '@rmwc/card'
import { Drawer, DrawerContent } from '@rmwc/drawer'
import Components from 'components'
import React, { CSSProperties, FunctionComponent } from 'react'
import { CardListItemProps } from './cards'

interface CardWrapAction extends CardListItemProps {
  className: string
  style: CSSProperties,
  outlined: boolean
}

const CardWrapWithAction: FunctionComponent<CardWrapAction> = ({ content, className, style, outlined, children }) => {
  let [open, setOpen] = React.useState<boolean>(false)
  const body = content.body || []

  function onDrawerClose() {
    setOpen(false)
    document.body.style.overflow = 'auto' // prevent scroll while its open
  }

  function onDrawerOpen() {
    document.body.style.overflow = 'hidden' // prevent scroll while its open
  }

  return (
    <SbEditable content={content}>
      <Card className={className}
            style={style}
            outlined={outlined}>
        <a onClick={() => setOpen(!open)}>
          {children}
        </a>
      </Card>
      <Drawer modal
              open={open}
              dir="rtl"
              className="lm-card__drawer"
              onOpen={() => onDrawerOpen()}
              onClose={() => onDrawerClose()}>
        <DrawerContent dir="ltr">
          {body.map(blok => Components(blok))}
        </DrawerContent>
      </Drawer>
    </SbEditable>
  )
}

export default CardWrapWithAction
