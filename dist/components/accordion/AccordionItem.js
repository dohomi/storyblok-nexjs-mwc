import SbEditable from 'storyblok-react';
import Components from '@components';
import { default as React, useState } from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import Plus from 'mdi-material-ui/Plus';
const AccordionItem = ({ content, options, setOpen, opened, iteration }) => {
    const [isOpen, setIsOpen] = useState('');
    const handleChange = (panel) => (_, isExpanded) => {
        options.restrict_one ? setOpen(isExpanded ? panel : '') : setIsOpen(isExpanded ? panel : '');
    };
    const panelKey = `panel-${iteration}`;
    const expanded = options.restrict_one ? opened === panelKey : isOpen === panelKey;
    return (React.createElement(SbEditable, { content: content },
        React.createElement(ExpansionPanel, { square: options.square ? true : false, expanded: expanded, onChange: handleChange(panelKey) },
            React.createElement(ExpansionPanelSummary, { expandIcon: (content.use_plus_icon || options.use_plus) ? React.createElement(Plus, null) : React.createElement(ChevronDown, null) },
                React.createElement(Typography, null, content.title)),
            React.createElement(ExpansionPanelDetails, null,
                React.createElement("div", null, (content.body || []).map(blok => Components(blok)))))));
};
export default AccordionItem;
