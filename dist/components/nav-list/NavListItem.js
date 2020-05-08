import React from 'react';
import ContentLink from '../link/ContentLink';
const NavListItem = (props) => {
    const content = Object.assign({}, props);
    return (React.createElement(ContentLink, { isMuiLink: true, className: 'lm-nav-link__item', content: content }, content.name));
};
export default NavListItem;
