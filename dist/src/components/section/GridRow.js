import * as React from 'react';
import SbEditable from 'storyblok-react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import Components from '@components';
import clsx from 'clsx';
import BackgroundImage from './BackgroundImage';
import BackgroundElements from './BackgroundElements';
import useBackgroundBox from './useBackgroundBox';
const useStyles = makeStyles((theme) => createStyles({
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
    xsColumnReverse: {
        [theme.breakpoints.only('xs')]: {
            flexDirection: 'column-reverse'
        }
    },
    smColumnReverse: {
        [theme.breakpoints.only('sm')]: {
            flexDirection: 'column-reverse'
        }
    }
}));
const GridRow = ({ content }) => {
    // const theme = useTheme()
    const classes = useStyles();
    let spacing = content.spacing ? Number(content.spacing) : 3;
    const background = Array.isArray(content.background) && content.background[0];
    const direction = content.direction;
    const { style, className } = useBackgroundBox({ background });
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { container: true, style: Object.assign(Object.assign({}, style), { padding: spacing ? `-${spacing * 8}px` : undefined }), spacing: spacing, alignItems: content.align_items ? content.align_items : undefined, direction: direction ? direction : undefined, className: clsx(className, classes.gridRow, {
                [classes.xsColumnReverse]: content.reverse_on_mobile,
                [classes.smColumnReverse]: content.reverse_on_tablet
            }), justify: content.justify ? content.justify : undefined, alignContent: content.align_content ? content.align_content : undefined },
            (background === null || background === void 0 ? void 0 : background.image) &&
                React.createElement(BackgroundImage, { content: background, backgroundStyle: content.background_style }),
            (background === null || background === void 0 ? void 0 : background.background_elements) && background.background_elements.length > 0 &&
                React.createElement(BackgroundElements, { elements: background.background_elements }),
            content.body && content.body.map((blok) => Components(blok)))));
};
export default GridRow;
