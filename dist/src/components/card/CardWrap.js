import SbEditable from 'storyblok-react';
import React from 'react';
import CardWrapWithAction from './CardWrapWithAction';
import Card from '@material-ui/core/Card';
import ContentLink from '../link/ContentLink';
import clsx from 'clsx';
import useShadowStyles from '../jss/shadowStyles';
const CardWrap = ({ children, content, options }) => {
    const className = 'lm-card';
    const styles = useShadowStyles();
    const variants = options.variant || [];
    const style = {
        borderRadius: options.border_radius ? options.border_radius : undefined
    };
    if (content.body && content.body.length) {
        return React.createElement(CardWrapWithAction, { className: className, content: content, style: style, options: options }, children);
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Card, { className: clsx(className, {
                [styles[options.shadow_effect]]: !!options.shadow_effect
            }), raised: variants.includes('raised'), elevation: options.elevation ? Number(options.elevation) : undefined, style: style },
            React.createElement(ContentLink, { content: content, className: 'lm-card__link' }, children))));
};
export default CardWrap;
