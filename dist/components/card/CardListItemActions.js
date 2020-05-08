import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Components from '@components';
const CardListItemActions = ({ options, content }) => {
    const cardActionsBody = content.card_actions_body || [];
    if (!cardActionsBody.length) {
        return null;
    }
    return (React.createElement(CardActions, { disableSpacing: !!options.card_actions_disable_spacing }, cardActionsBody.map(blok => Components(blok))));
};
export default CardListItemActions;
