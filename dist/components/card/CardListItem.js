var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import CardMediaElement from './CardMediaElement';
import CardWrap from './CardWrap';
import CardListActionTitles from './CardLinkActionTitle';
import * as React from 'react';
import CardDescriptionText from './CardDescriptionText';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardListItemActions from './CardListItemActions';
var CardListItem = function (props) {
    var content = props.content, options = props.options;
    var variants = options.variant || [];
    // without media / text only
    if (!content.image || options.hide_image) {
        return (React.createElement(CardWrap, __assign({}, props),
            React.createElement(CardActionArea, null,
                React.createElement(CardContent, null,
                    React.createElement(CardListActionTitles, __assign({}, props)),
                    React.createElement(CardDescriptionText, __assign({}, props)))),
            React.createElement(CardListItemActions, __assign({}, props))));
    }
    // header on top
    if (variants.includes('header_top')) {
        return (React.createElement(CardWrap, __assign({}, props),
            React.createElement(CardContent, null,
                React.createElement(CardListActionTitles, __assign({}, props))),
            React.createElement(CardActionArea, null,
                React.createElement(CardMediaElement, __assign({}, props)),
                content.description && (React.createElement(CardContent, null,
                    React.createElement(CardDescriptionText, __assign({}, props))))),
            React.createElement(CardListItemActions, __assign({}, props))));
    }
    // header over media
    if (variants.includes('over_media')) {
        return (React.createElement(CardWrap, __assign({}, props),
            React.createElement(CardActionArea, null,
                React.createElement(CardMediaElement, __assign({}, props),
                    React.createElement(CardContent, { style: {
                            padding: variants.includes('overlay_content_no_space') ? 0 : undefined
                        } },
                        React.createElement(CardListActionTitles, __assign({}, props)))),
                content.description && (React.createElement(CardContent, null,
                    React.createElement(CardDescriptionText, __assign({}, props))))),
            React.createElement(CardListItemActions, __assign({}, props))));
    }
    // content title and description bottom
    return (React.createElement(CardWrap, __assign({}, props),
        React.createElement(CardActionArea, null,
            React.createElement(CardMediaElement, __assign({}, props)),
            (content.description || content.title || content.subtitle) && (React.createElement(CardContent, null,
                React.createElement(CardListActionTitles, __assign({}, props)),
                React.createElement(CardDescriptionText, __assign({}, props))))),
        React.createElement(CardListItemActions, __assign({}, props))));
};
export default CardListItem;
