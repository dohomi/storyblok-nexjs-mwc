import {
  List,
  SimpleListItem,
  CollapsibleList
} from '@rmwc/list'
import {object} from 'prop-types'
import {Link} from 'routes/index'
import {linkHandler} from '../../utils/linkHandler'

const LinkItem = (props) => {
  const content = {...props}
  linkHandler(content, content.link, {openExternal: !!props.open_external})
  return content.to ? (
    <Link to={content.to}><a>{props.children}</a></Link>
  ) : (
    <a href={content.href}>{props.children}</a>
  )
}

const CollapsibleListSection = (props) => {
  const body = props.body || []
  return (
    <CollapsibleList handle={<SimpleListItem text={props.title} metaIcon="chevron_right"/>}>
      {body.map(content => (
          <LinkItem  {...content} key={content._uid}>
            <SimpleListItem text={content.label}/>
          </LinkItem>
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
            <LinkItem  {...props} key={props._uid}>
              <SimpleListItem text={props.label}/>
            </LinkItem>
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
