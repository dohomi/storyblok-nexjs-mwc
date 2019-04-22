import SbEditable from 'storyblok-react'
import {MenuSurfaceAnchor, MenuSurface, MenuItem} from '@rmwc/menu'
import Components from 'components/index'
import {Button} from '@rmwc/button'
import {setMegaMenu, useGlobalState} from '../../utils/state/state'

const CustomMenu = ({content}) => {

  let [open] = useGlobalState('megaMenu')
  // const [open, setOpen] = useState(false)
  const menuItems = content.body || []
  const buttonProps = {
    // ['onMouseOver']: () => openMegaMenu(),
    ['onClick']: () => openMegaMenu()
  }

  function openMegaMenu () {
    setTimeout(() => {
      setMegaMenu(content._uid, true)
    }, 150)
  }

  //style={{position: 'inherit'}}


  return (
    <SbEditable content={content}>
      <MenuSurfaceAnchor style={{position: 'inherit'}} className="lm-mega-menu">
        <Button trailingIcon="expand_more" {...buttonProps}>{content.title}</Button>
        <MenuSurface open={open[content._uid] === true} anchorCorner="bottomStart" style={{marginTop: '24px'}}
                     onClose={() => setMegaMenu(content._uid, false)}>
          {menuItems.map(blok => Components(blok))}
        </MenuSurface>
      </MenuSurfaceAnchor>
    </SbEditable>
  )
}

export default CustomMenu
