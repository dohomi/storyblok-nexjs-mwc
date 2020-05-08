import React from 'react';
import SbEditable from 'storyblok-react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import TimelineRowItem from './TimelineRowItem';
import LmAvatar from '../avatar/LmAvatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
var useStyles = makeStyles(function (theme) { return createStyles({
    iconGrid: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        position: 'absolute',
        left: 'calc(50% - 1px)',
        width: '2px',
        height: '100%',
        backgroundColor: theme.palette.grey.A100
    },
    iconContainer: {
        zIndex: 0,
        margin: '0 !important'
    }
}); });
var TimelineRow = function (_a) {
    var content = _a.content, iteration = _a.iteration;
    var classes = useStyles();
    var theme = useTheme();
    var isMobile = useMediaQuery(theme.breakpoints.only('xs'));
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { item: true, xs: 8, sm: 5 }, (iteration % 2 === 0 || isMobile) && React.createElement(TimelineRowItem, { isLeft: true, content: content })),
        React.createElement(Grid, { item: true, xs: 4, sm: 2, className: classes.iconGrid },
            React.createElement("div", { className: classes.line }),
            React.createElement("div", { className: classes.iconContainer }, content.icon && content.icon.map(function (blok) { return React.createElement(LmAvatar, { content: blok, key: blok._uid }); }))),
        React.createElement(Grid, { item: true, xs: 5, sm: 5, style: { display: isMobile ? 'none' : undefined } }, iteration % 2 !== 0 && React.createElement(TimelineRowItem, { isLeft: false, content: content }))));
};
export default TimelineRow;
