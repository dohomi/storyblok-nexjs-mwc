import React from 'react';
import SbEditable from 'storyblok-react';
import TimelineRow from './TimelineRow';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex'
    }
});
const Timeline = ({ content }) => {
    const classes = useStyles();
    const body = content.body || [];
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: 'lm-timeline' },
            React.createElement(Grid, { container: true, className: classes.container }, body.map((blok, i) => React.createElement(TimelineRow, { content: blok, iteration: i, key: blok._uid }))))));
};
export default Timeline;
