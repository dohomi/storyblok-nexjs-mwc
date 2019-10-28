import SbEditable from 'storyblok-react'
import { MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu'
import Components from '@components'
import { Button } from '@rmwc/button'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NavMenuStoryblok } from '../../typings/generated/components-schema'

const CustomMenu: FunctionComponent<{ content: NavMenuStoryblok }> = ({ content }) => {
  const { asPath } = useRouter()
  const [open, setOpen] = useState(false)
  const menuItems = content.body || []
  const buttonProps = {
    ['onClick']: () => openMegaMenu()
  }

  useEffect(
    () => {
      setOpen(false)
    },
    [asPath]
  )

  function openMegaMenu() {
    setOpen(true)
  }

  function onClose() {
    setOpen(false)
  }

  return (
    <SbEditable content={content}>
      <MenuSurfaceAnchor className="lm-mega-menu">
        <Button trailingIcon="expand_more"
                {...buttonProps}>{content.title}</Button>
        <MenuSurface open={open}
                     anchorCorner="bottomStart"
                     style={{ borderRadius: `${content.border_radius || 4}px` }}
                     onClose={() => onClose()}>
          {menuItems.map(blok => Components(blok))}
        </MenuSurface>
      </MenuSurfaceAnchor>
    </SbEditable>
  )
}

export default CustomMenu
