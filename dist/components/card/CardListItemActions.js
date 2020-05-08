import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Components from '@components';
var CardListItemActions = function (_a) {
    var options = _a.options, content = _a.content;
    var cardActionsBody = content.card_actions_body || [];
    if (!cardActionsBody.length) {
        return null;
    }
    return (React.createElement(CardActions, { disableSpacing: !!options.card_actions_disable_spacing }, cardActionsBody.map(function (blok) { return Components(blok); })));
};
export default CardListItemActions;
