import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Components from '@components';
import clsx from 'clsx';
import CardActionArea from '@material-ui/core/CardActionArea';
import ContentLink from '../link/ContentLink';
var useStyles = makeStyles(function (theme) { return createStyles({
    cardContainer: {
        position: 'relative',
        padding: theme.spacing(1) + "px 0"
    },
    cardDecorator: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderTop: '16px solid transparent',
        borderBottom: '16px solid transparent',
        top: 'calc(50% - 16px)'
    },
    cardDecoratorLeft: {
        left: '100%',
        borderLeft: '16px solid' + theme.palette.grey.A100
    },
    cardDecoratorRight: {
        borderRight: '16px solid' + theme.palette.grey.A100,
        right: '100%'
    }
}); });
var CardContentWrap = function (_a) {
    var content = _a.content, children = _a.children;
    if (content.link) {
        return (React.createElement(ContentLink, { content: content, className: "lm-timeline__link" },
            React.createElement(CardActionArea, null, children)));
    }
    return (React.createElement(React.Fragment, null, children));
};
var TimelineRowItem = function (_a) {
    var isLeft = _a.isLeft, content = _a.content;
    var classes = useStyles();
    var body = content.body || [];
    return (React.createElement("div", { className: classes.cardContainer },
        React.createElement("div", { className: clsx(classes.cardDecorator, isLeft ? classes.cardDecoratorLeft : classes.cardDecoratorRight) }),
        React.createElement(Card, null,
            React.createElement(CardContentWrap, { content: content },
                (content.title || content.subheader) && React.createElement(CardHeader, { title: content.title, subheader: content.subheader }),
                body.length > 0 && React.createElement(CardContent, null, body.map(function (blok) { return Components(blok); }))))));
};
export default TimelineRowItem;
