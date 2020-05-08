import React from 'react';
import RteText from './RteNodeText';
import RteNode from './RteNode';
var RteComponents = {
    'heading': RteNode,
    'text': RteText,
    'paragraph': RteNode,
    'blockquote': RteNode,
    'bullet_list': RteNode,
    'list_item': RteNode,
    'ordered_list': RteNode,
    'horizontal_rule': function () { return (React.createElement("hr", null)); },
    'hard_break': RteNode,
    'image': RteNode,
    'code_block': RteNode
};
export default (function (blok, i) {
    if (typeof RteComponents[blok.type] !== 'undefined') {
        return React.createElement(RteComponents[blok.type], { content: blok, key: blok.type + "_" + i });
    }
    return React.createElement(function () { return (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.type,
        " ",
        i,
        " has not been created yet.")); }, { key: blok.type + "_" + i });
});
