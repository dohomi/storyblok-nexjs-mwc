import * as React from 'react';
import RteContentRender from './RteContentRender';
const ElementMap = {
    'paragraph': 'p',
    'blockquote': 'blockquote',
    'bullet_list': 'ul',
    'list_item': 'li',
    'ordered_list': 'ol',
    'horizontal_rule': 'hr',
    'hard_break': 'br',
    // 'image': '',
    'code_block': 'code'
};
const RteNode = ({ content }) => {
    return React.createElement(content.type === 'heading' ? `h${content.attrs.level || '3'}` : ElementMap[content.type], {}, content.content && content.content.map((blok, i) => RteContentRender(blok, i)));
};
export default RteNode;
