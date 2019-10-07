import {TextField} from '@rmwc/textfield'

const DrawerSearch = (content) => {
  return (
    <TextField fullwidth
               id={content._uid}
               placeholder={content.placeholder || 'Search...'}
               icon="search"/>
  )
}

export default DrawerSearch
