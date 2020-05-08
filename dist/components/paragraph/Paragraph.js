import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import * as React from 'react';
import parseMarkdownContent from './markdown-helper';
import Typography from '@material-ui/core/Typography';
import { mapTypographyVariant } from '../../utils/muiMapProps';
import { useRichTextStyles } from './richTextStyles';
var Paragraph = function (_a) {
    var _b;
    var content = _a.content;
    var classes = useRichTextStyles();
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Typography, { className: clsx('lm-markup', classes.richText, content.style, content.class_names && content.class_names.values, (_b = {},
                _b["lm-font-" + content.font] = content.font,
                _b)), variant: mapTypographyVariant[content.typography ? content.typography : 'body1'], component: "div", dangerouslySetInnerHTML: {
                __html: parseMarkdownContent(content.text)
            } })));
};
export default Paragraph;
