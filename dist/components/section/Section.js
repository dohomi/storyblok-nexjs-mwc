import Components from '@components';
import SbEditable from 'storyblok-react';
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import BackgroundImage from './BackgroundImage';
import BackgroundElements from './BackgroundElements';
import useBackgroundBox from './useBackgroundBox';
const useStyles = makeStyles({
    fullHeight: {
        width: '100%',
        height: '100%',
        minHeight: '100vh'
    },
    background: {
        position: 'relative',
        overflow: 'hidden',
        '& .MuiGrid-root': {
            position: 'relative'
        }
    },
    dark: {
        '& .MuiButton-root.lm-default-color, & .MuiIconButton-root.lm-default-color': {
            color: 'inherit',
            '&.MuiButton-outlined,&.lm-outlined': {
                borderColor: 'currentColor'
            }
        }
    }
});
const Section = ({ content }) => {
    var _a;
    const classes = useStyles();
    const theme = useTheme();
    const background = Array.isArray(content.background) && content.background[0];
    const { style, className } = useBackgroundBox({ variant: content.variant, background });
    const body = content.body || [];
    let containerStyles = {};
    const isFullHeight = !!(content.property && content.property.includes('is_full_height'));
    if (!isFullHeight) {
        const splittedPadding = ((_a = content.padding) === null || _a === void 0 ? void 0 : _a.split(' ')) || [];
        if (splittedPadding.length > 2) {
            containerStyles.padding = content.padding;
        }
        containerStyles.paddingTop = splittedPadding[0] || '2.5rem';
        containerStyles.paddingBottom = splittedPadding[0] || '2.5rem';
    }
    let maxWidth = theme.defaultContainerWidth;
    if (content.max_width) {
        maxWidth = content.max_width === 'none' ? false : content.max_width;
    }
    // todo className doubled used
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: clsx(classes.background, { [classes.dark]: !!content.variant }, className), style: style, id: content.section_identifier || content._uid },
            ((background === null || background === void 0 ? void 0 : background.image) || (background === null || background === void 0 ? void 0 : background.background_elements)) &&
                React.createElement(BackgroundImage, { content: background, backgroundStyle: content.background_style }),
            (background === null || background === void 0 ? void 0 : background.background_elements) && background.background_elements.length > 0 &&
                React.createElement(BackgroundElements, { elements: background.background_elements }),
            React.createElement(Container, { style: containerStyles, maxWidth: maxWidth, className: clsx(className, {
                    [classes.fullHeight]: isFullHeight
                }) }, body.map((blok) => Components(blok))))));
};
export default Section;
