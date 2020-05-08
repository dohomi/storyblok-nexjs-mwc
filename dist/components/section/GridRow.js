var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import SbEditable from 'storyblok-react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import Components from '@components';
import clsx from 'clsx';
import BackgroundImage from './BackgroundImage';
import BackgroundElements from './BackgroundElements';
import useBackgroundBox from './useBackgroundBox';
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return createStyles({
        gridRow: {
            height: '100%',
            minHeight: 'inherit',
            '& .MuiGrid-item': {
                '& > .MuiGrid-direction-xs-column': {
                    '& > *': {
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1),
                        boxSizing: 'border-box',
                        '&:first-child': {
                            marginTop: 0
                        },
                        '&:last-child': {
                            marginBottom: 0
                        }
                    }
                },
                '& > *': {
                    marginTop: theme.spacing(2),
                    marginBottom: theme.spacing(2),
                    boxSizing: 'border-box',
                    '&:first-child': {
                        marginTop: 0
                    },
                    '&:last-child': {
                        marginBottom: 0
                    }
                }
            }
        },
        xsColumnReverse: (_a = {},
            _a[theme.breakpoints.only('xs')] = {
                flexDirection: 'column-reverse'
            },
            _a),
        smColumnReverse: (_b = {},
            _b[theme.breakpoints.only('sm')] = {
                flexDirection: 'column-reverse'
            },
            _b)
    });
});
var GridRow = function (_a) {
    var _b;
    var content = _a.content;
    // const theme = useTheme()
    var classes = useStyles();
    var spacing = content.spacing ? Number(content.spacing) : 3;
    var background = Array.isArray(content.background) && content.background[0];
    var direction = content.direction;
    var _c = useBackgroundBox({ background: background }), style = _c.style, className = _c.className;
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { container: true, style: __assign(__assign({}, style), { padding: spacing ? "-" + spacing * 8 + "px" : undefined }), spacing: spacing, alignItems: content.align_items ? content.align_items : undefined, direction: direction ? direction : undefined, className: clsx(className, classes.gridRow, (_b = {},
                _b[classes.xsColumnReverse] = content.reverse_on_mobile,
                _b[classes.smColumnReverse] = content.reverse_on_tablet,
                _b)), justify: content.justify ? content.justify : undefined, alignContent: content.align_content ? content.align_content : undefined },
            (background === null || background === void 0 ? void 0 : background.image) &&
                React.createElement(BackgroundImage, { content: background, backgroundStyle: content.background_style }),
            (background === null || background === void 0 ? void 0 : background.background_elements) && background.background_elements.length > 0 &&
                React.createElement(BackgroundElements, { elements: background.background_elements }),
            content.body && content.body.map(function (blok) { return Components(blok); }))));
};
export default GridRow;
