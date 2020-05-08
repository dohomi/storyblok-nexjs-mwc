import * as React from 'react';
import Components from '@components';
import ContentLink from './ContentLink';
const LinkWrap = ({ content }) => {
    const body = content.body || [];
    return (React.createElement(ContentLink, { className: 'lm-wrap-content__link', content: content }, body.map(blok => Components(blok))));
};
export default LinkWrap;
