import CardMediaElement from './CardMediaElement';
import CardWrap from './CardWrap';
import CardListActionTitles from './CardLinkActionTitle';
import * as React from 'react';
import CardDescriptionText from './CardDescriptionText';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardListItemActions from './CardListItemActions';
const CardListItem = (props) => {
    const { content, options } = props;
    const variants = options.variant || [];
    // without media / text only
    if (!content.image || options.hide_image) {
        return (React.createElement(CardWrap, Object.assign({}, props),
            React.createElement(CardActionArea, null,
                React.createElement(CardContent, null,
                    React.createElement(CardListActionTitles, Object.assign({}, props)),
                    React.createElement(CardDescriptionText, Object.assign({}, props)))),
            React.createElement(CardListItemActions, Object.assign({}, props))));
    }
    // header on top
    if (variants.includes('header_top')) {
        return (React.createElement(CardWrap, Object.assign({}, props),
            React.createElement(CardContent, null,
                React.createElement(CardListActionTitles, Object.assign({}, props))),
            React.createElement(CardActionArea, null,
                React.createElement(CardMediaElement, Object.assign({}, props)),
                content.description && (React.createElement(CardContent, null,
                    React.createElement(CardDescriptionText, Object.assign({}, props))))),
            React.createElement(CardListItemActions, Object.assign({}, props))));
    }
    // header over media
    if (variants.includes('over_media')) {
        return (React.createElement(CardWrap, Object.assign({}, props),
            React.createElement(CardActionArea, null,
                React.createElement(CardMediaElement, Object.assign({}, props),
                    React.createElement(CardContent, { style: {
                            padding: variants.includes('overlay_content_no_space') ? 0 : undefined
                        } },
                        React.createElement(CardListActionTitles, Object.assign({}, props)))),
                content.description && (React.createElement(CardContent, null,
                    React.createElement(CardDescriptionText, Object.assign({}, props))))),
            React.createElement(CardListItemActions, Object.assign({}, props))));
    }
    // content title and description bottom
    return (React.createElement(CardWrap, Object.assign({}, props),
        React.createElement(CardActionArea, null,
            React.createElement(CardMediaElement, Object.assign({}, props)),
            (content.description || content.title || content.subtitle) && (React.createElement(CardContent, null,
                React.createElement(CardListActionTitles, Object.assign({}, props)),
                React.createElement(CardDescriptionText, Object.assign({}, props))))),
        React.createElement(CardListItemActions, Object.assign({}, props))));
};
export default CardListItem;
