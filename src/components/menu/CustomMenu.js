import SbEditable from 'storyblok-react'
import {MenuSurfaceAnchor, MenuSurface, MenuItem} from '@rmwc/menu'
import Components from 'components/index'
import {Button} from '@rmwc/button'
import {setMegaMenu, useGlobalState} from '../../utils/state/state'
import {useState} from 'react'

const CustomMenu = ({content}) => {

  // let [open] = useGlobalState('megaMenu')
  const [open, setOpen] = useState(false)
  const menuItems = content.body || []
  const buttonProps = {
    // ['onMouseOver']: () => openMegaMenu(),
    ['onClick']: () => openMegaMenu()
  }

  function openMegaMenu () {
    setOpen(true)
    // setTimeout(() => {
    //   setMegaMenu(content._uid)
    // }, 150)
  }

  function onClose () {
    setOpen(false)
    // setMegaMenu(content._uid, true)
  }

  //style={{position: 'inherit'}}


  return (
    <SbEditable content={content}>
      <MenuSurfaceAnchor style={{position: 'inherit'}} className="lm-mega-menu">
        <Button trailingIcon="expand_more" {...buttonProps}>{content.title}</Button>
        <MenuSurface open={open} anchorCorner="bottomStart" style={{marginTop: '24px', borderRadius: `${content.border_radius || 4}px`}}
                     onClose={() => onClose()}>
          {menuItems.map(blok => Components(blok))}
        </MenuSurface>
      </MenuSurfaceAnchor>
    </SbEditable>
  )
}

export default CustomMenu
