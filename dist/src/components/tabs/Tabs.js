import * as React from 'react';
import { useState } from 'react';
import Components from '@components';
import SwipeableViews from 'react-swipeable-views';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LmIcon from '../icon/LmIcon';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles((theme) => ({
    tabContainer: {
        '& .react-swipeable-view-container > div > div': {
            padding: theme.spacing(3)
        }
    },
    vertical: {
        '& .MuiTabs-flexContainerVertical': {
            borderRight: `1px solid ${theme.palette.divider}`
        },
        '& .react-swipeable-view-container > div > div': {
            paddingTop: 0,
            paddingBottom: 0
        }
    }
}));
const widthMap = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    'false': false,
    'auto': 'auto',
    'true': true
};
const Tabs = ({ content }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(content.mobile_breakpoint || 'xs'));
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(0);
    const body = content.body || [];
    const orientation = content.vertical_tabs && !isMobile ? 'vertical' : 'horizontal';
    const isVertical = orientation === 'vertical';
    return (React.createElement(Grid, { container: true, direction: 'row', className: clsx(classes.tabContainer, {
            [classes.vertical]: isVertical
        }) },
        React.createElement(Grid, { item: true, xs: 12, sm: isVertical ? (content.tabs_width ? widthMap[content.tabs_width] : 'auto') : 12 },
            React.createElement("div", null,
                React.createElement(MuiTabs, { "aria-label": "tabs", indicatorColor: content.indicator_color ? content.indicator_color : undefined, textColor: content.text_color ? content.text_color : undefined, value: activeTab, scrollButtons: "on", centered: !!content.centered && !isMobile, variant: isMobile ? 'scrollable' : (content.variant || 'fullWidth'), orientation: orientation, onChange: (_, value) => {
                        setActiveTab(value);
                    } }, body.map((tab, iteration) => React.createElement(Tab, { label: tab.title, wrapped: !!content.wrapped, icon: tab.icon && tab.icon.name &&
                        React.createElement(LmIcon, { style: { fontSize: 24 }, className: 'MuiIcon-root', iconName: tab.icon.name }), "aria-controls": `tabpanel-${iteration}`, key: tab._uid }))))),
        React.createElement(Grid, { item: true, xs: 12, sm: isVertical ? (content.content_width ? widthMap[content.content_width] : 'auto') : 12 },
            React.createElement("div", null,
                React.createElement(SwipeableViews, { index: activeTab, onChangeIndex: (i) => setActiveTab(i), className: 'lm-slide-content', animateHeight: content.dynamic_height || false, axis: 'x' }, body.map((tab) => (React.createElement("div", { key: `content_${tab._uid}` }, tab.body && tab.body.map((blok) => Components(blok))))))))));
};
export default Tabs;
