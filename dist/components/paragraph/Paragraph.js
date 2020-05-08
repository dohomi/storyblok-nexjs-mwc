import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import * as React from 'react';
import parseMarkdownContent from './markdown-helper';
import Typography from '@material-ui/core/Typography';
import { mapTypographyVariant } from '../../utils/muiMapProps';
import { useRichTextStyles } from './richTextStyles';
const Paragraph = ({ content }) => {
    const classes = useRichTextStyles();
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Typography, { className: clsx('lm-markup', classes.richText, content.style, content.class_names && content.class_names.values, {
                [`lm-font-${content.font}`]: content.font
            }), variant: mapTypographyVariant[content.typography ? content.typography : 'body1'], component: "div", dangerouslySetInnerHTML: {
                __html: parseMarkdownContent(content.text)
            } })));
};
export default Paragraph;
