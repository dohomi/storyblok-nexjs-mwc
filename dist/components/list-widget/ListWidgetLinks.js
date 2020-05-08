import React from 'react';
import NavList from '../nav-list/NavList';
const ListWidgetLinks = ({ items, options, content }) => {
    const listProps = Object.assign(Object.assign({}, options), { _uid: content._uid, body: items.map((item) => {
            const opts = {
                _uid: content._uid + item.uuid,
                component: 'nav_item',
                name: (item.content && (item.content.preview_title || item.name)) || '',
                link: {
                    cached_url: item.full_slug,
                    linktype: 'story'
                }
            };
            return opts;
        }) });
    return (React.createElement(NavList, { content: listProps }));
};
export default ListWidgetLinks;
