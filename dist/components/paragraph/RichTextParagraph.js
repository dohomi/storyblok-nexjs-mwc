import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import * as React from 'react';
import RteContentRender from './rte/RteContentRender';
import Typography from '@material-ui/core/Typography';
import { mapTypographyVariant } from '../../utils/muiMapProps';
import { useRichTextStyles } from './richTextStyles';
var RichTextParagraph = function (_a) {
    var _b;
    var content = _a.content;
    var classes = useRichTextStyles();
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Typography, { className: clsx('lm-markup', classes.richText, content.style, content.class_names && content.class_names.values, (_b = {},
                _b["lm-font-" + content.font] = content.font,
                _b)), align: content.align ? content.align : undefined, color: content.color ? content.color : undefined, component: "div", style: {
                color: content.custom_color && content.custom_color.rgba ? content.custom_color.rgba : undefined,
                lineHeight: content.line_height ? content.line_height : undefined,
                fontSize: content.font_size ? content.font_size : undefined,
                letterSpacing: content.letter_spacing ? content.letter_spacing : undefined
            }, variant: mapTypographyVariant[content.typography ? content.typography : 'body1'] }, content.body && content.body.content.map(function (blok, i) { return RteContentRender(blok, i); }))));
};
export default RichTextParagraph;
