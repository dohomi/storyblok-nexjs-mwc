import React from 'react';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Link from 'next/link';
import SbEditable from 'storyblok-react';
import ListItem from '@material-ui/core/ListItem';
import LmMuiAvatar from '../avatar/LmMuiAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { internalLinkHandler } from '../../utils/linkHandler';
var ListWidgetLists = function (_a) {
    var items = _a.items, options = _a.options, content = _a.content;
    var imageSize = options.image_size || 'large';
    var hideImage = options.hide_image;
    return (React.createElement(SbEditable, { content: content },
        React.createElement(List, null, items.map(function (item) { return (React.createElement(Link, { href: "/[...index]", as: internalLinkHandler(item.full_slug), key: item.uuid, passHref: true, prefetch: false },
            React.createElement(ListItem, { component: 'a' },
                !hideImage && item.content.preview_image && (React.createElement(ListItemAvatar, null,
                    React.createElement(LmMuiAvatar, { src: item.content.preview_image, size: imageSize }))),
                React.createElement(ListItemText, { primary: item.content.preview_title || item.name, secondary: !options.hide_subtitle && item.content.preview_subtitle })))); }))));
};
export default ListWidgetLists;
