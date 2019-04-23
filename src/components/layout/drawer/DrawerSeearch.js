import {TextField} from '@rmwc/textfield'

const DrawerSearch = (content) => {
  return (
    <TextField fullwidth
               id={content._uid}
               placeholder={'todo...'}
               icon="search"/>
  )
}

export default DrawerSearch
