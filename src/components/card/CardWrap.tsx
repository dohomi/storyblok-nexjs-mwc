import SbEditable from 'storyblok-react'
import { Card, CardProps } from '@rmwc/card'
import CardLink from './CardLink'
import Components from 'components'
import { Drawer, DrawerContent } from '@rmwc/drawer'
import React, { CSSProperties, FunctionComponent } from 'react'
import { CardListItemProps } from './CardLinkActionTitle'

type CardWrapProps = CardProps & {
  className: string
  style: CSSProperties
  content: CardListItemProps
}

const CardWrap: FunctionComponent<CardWrapProps> = ({ children, content, className, style, outlined }) => {
  const body = content.body || []
  let [open, setOpen] = React.useState(false)

  function onDrawerClose() {
    setOpen(false)
    document.body.style.overflow = 'auto' // prevent scroll while its open
  }

  function onDrawerOpen() {
    document.body.style.overflow = 'hidden' // prevent scroll while its open
  }

  if (body.length) {
    return (
      <SbEditable content={content}>
        <Card className={className}
              style={style}
              outlined={outlined}>
          <a onClick={() => setOpen(!open)}>
            {children}
          </a>
        </Card>
        <Drawer modal open={open}
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

  return (
    <SbEditable content={content}>
      <Card className={className} style={style} outlined={outlined}>
        <CardLink {...content}>
          {children}
        </CardLink>
      </Card>
    </SbEditable>
  )
}

export default CardWrap
