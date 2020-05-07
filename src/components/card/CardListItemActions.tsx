import React, { FunctionComponent } from 'react'
import CardActions from '@material-ui/core/CardActions'
import { CardListItemProps } from './cards'
import Components from '@components'

const CardListItemActions: FunctionComponent<CardListItemProps> = ({ options, content }) => {
  const cardActionsBody = content.card_actions_body || []
  if (!cardActionsBody.length) {
    return null
  }
  return (
    <CardActions disableSpacing={!!options.card_actions_disable_spacing}>
      {cardActionsBody.map(blok => Components(blok))}
    </CardActions>
  )
}

export default CardListItemActions
