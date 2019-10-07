import {CollapsibleList, SimpleListItem} from '@rmwc/list'
import {object} from 'prop-types'
import DrawerButton from './DrawerButton'
import React from 'react'
import DrawerNavList from './DrawerNavList'

const Components = {
  'button': DrawerButton,
  'nav_list': DrawerNavList
}

const Child = (blok) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], {...blok, key: blok._uid})
  }
  return React.createElement(() => (
    <div style={{color: 'red'}}>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const CollapsibleListSection = (props) => {
  const body = props.body || []
  const items = []
  body.forEach(firstLevel => {
    if (firstLevel.body && firstLevel.body.length) {
      // mega menu // consist of row / column / nav_list | button
      firstLevel.body.forEach(secondLevel => {
        if (secondLevel.body && secondLevel.body.length) {
          secondLevel.body.forEach(thirdLevel => {
            items.push(thirdLevel)
          })
        }
      })
    } else {
      // simple menu
      items.push(firstLevel)
    }
  })

  return (
    <CollapsibleList handle={<SimpleListItem text={props.title} metaIcon="chevron_right"/>}>
      {items.map(blok => Child(blok))}
    </CollapsibleList>
  )
}
CollapsibleList.propTypes = {
  content: object
}

export default CollapsibleListSection
