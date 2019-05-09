import SbEditable from 'storyblok-react'
import {MenuSurfaceAnchor, MenuSurface, MenuItem} from '@rmwc/menu'
import Components from 'components/index'
import {Button} from '@rmwc/button'
import {useState, useEffect} from 'react'
import {withRouter} from 'next/dist/client/router'

const CustomMenu = ({content, router}) => {
  const [open, setOpen] = useState(false)
  const menuItems = content.body || []
  const buttonProps = {
    ['onClick']: () => openMegaMenu()
  }

  useEffect(
    () => {
      setOpen(false)
    },
    [router.asPath]
  )

  function openMegaMenu () {
    setOpen(true)
  }

  function onClose () {
    setOpen(false)
  }

  return (
    <SbEditable content={content}>
      <MenuSurfaceAnchor className="lm-mega-menu">
        <Button trailingIcon="expand_more"
                {...buttonProps}>{content.title}</Button>
        <MenuSurface open={open}
                     anchorCorner="bottomStart"
                     style={{borderRadius: `${content.border_radius || 4}px`}}
                     onClose={() => onClose()}>
          {menuItems.map(blok => Components(blok))}
        </MenuSurface>
      </MenuSurfaceAnchor>
    </SbEditable>
  )
}

export default withRouter(CustomMenu)
