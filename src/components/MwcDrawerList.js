import {
  List,
  SimpleListItem,
  CollapsibleList
} from '@rmwc/list'
import {object} from 'prop-types'
import {Link} from '../routes'


const CollapsibleListSection = (props) => {
  const body = props.body || []
  return (
    <CollapsibleList handle={<SimpleListItem text={props.title} metaIcon="chevron_right"/>}>
      {body.map(content => (
          <Link route={`/${content.link && content.link.cached_url}`} key={content._uid}>
            <SimpleListItem text={content.label}/>
          </Link>
        )
      )}
    </CollapsibleList>
  )
}
CollapsibleList.propTypes = {
  content: object
}

const DrawerContentList = (content) => {
  const childs = content.toolbar || []
  return (
    <List>
      {childs.map(props => {
        if (props.component === 'button') {
          return (
            <Link route={`/${props.link && props.link.cached_url}`} key={props._uid}>
              <SimpleListItem text={props.label}/>
            </Link>
          )
        } else if (props.component === 'nav_menu') {
          return <CollapsibleListSection key={props._uid} {...props}/>
        } else {
          console.info('Unknown element for DrawerContentList', props)
        }
      })}
    </List>
  )
}
export default DrawerContentList
