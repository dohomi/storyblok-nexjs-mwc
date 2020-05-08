import SbEditable from 'storyblok-react';
import ToolbarSection from './ToolbarSection';
import * as React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
const ToolbarRow = ({ content, settings }) => {
    const body = content.body || [];
    const theme = useTheme();
    if (content.is_system_bar) {
        const toolbarConfig = settings.toolbar_config || [];
        let toolbarWidth = false;
        if (toolbarConfig.includes('fixed_width')) {
            toolbarWidth = settings.theme_container_width && settings.theme_container_width !== 'none' ? settings.theme_container_width : 'lg';
        }
        return (React.createElement(SbEditable, { content: content },
            React.createElement("div", { className: clsx('lm-system-bar'), style: {
                    backgroundColor: (content.background_color && content.background_color.rgba) || theme.palette.primary.main
                    // height: `${content.height || 40}px`
                } },
                React.createElement(Container, { className: "h-100", maxWidth: toolbarWidth },
                    React.createElement(Grid, { container: true, className: "h-100", justify: content.justify || 'space-between', alignContent: 'center', alignItems: 'center' }, body.map(p => React.createElement(ToolbarSection, { content: p, settings: settings, key: p._uid })))))));
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Grid, { container: true, justify: content.justify || 'space-between', className: "h-100", alignItems: 'center' }, body.map(p => React.createElement(ToolbarSection, { content: p, settings: settings, key: p._uid })))));
};
export default ToolbarRow;
