import SbEditable from 'storyblok-react'
import {Card} from '@rmwc/card'
import CardLink from './CardLink'
import Components from 'components/index'
import {Drawer, DrawerContent} from '@rmwc/drawer'
import React from 'react'


const CardWrap = ({children, content, className, style, outlined}) => {
  const body = content.body || []
  let [open, setOpen] = React.useState(false)

  function onDrawerClose () {
    setOpen(false)
    document.body.style.overflow = 'auto' // prevent scroll while its open
  }

  function onDrawerOpen () {
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
        <CardLink link={content.link}>
          {children}
        </CardLink>
      </Card>
      {body.length > 0 && (

        <Drawer model open={true}>
          {body.map(blok => Components(blok))}
        </Drawer>
      )}
    </SbEditable>
  )
}

export default CardWrap
