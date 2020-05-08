import SbEditable from 'storyblok-react';
import React from 'react';
import CardWrapWithAction from './CardWrapWithAction';
import Card from '@material-ui/core/Card';
import ContentLink from '../link/ContentLink';
import clsx from 'clsx';
import useShadowStyles from '../jss/shadowStyles';
var CardWrap = function (_a) {
    var _b;
    var children = _a.children, content = _a.content, options = _a.options;
    var className = 'lm-card';
    var styles = useShadowStyles();
    var variants = options.variant || [];
    var style = {
        borderRadius: options.border_radius ? options.border_radius : undefined
    };
    if (content.body && content.body.length) {
        return React.createElement(CardWrapWithAction, { className: className, content: content, style: style, options: options }, children);
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Card, { className: clsx(className, (_b = {},
                _b[styles[options.shadow_effect]] = !!options.shadow_effect,
                _b)), raised: variants.includes('raised'), elevation: options.elevation ? Number(options.elevation) : undefined, style: style },
            React.createElement(ContentLink, { content: content, className: 'lm-card__link' }, children))));
};
export default CardWrap;
