import SbEditable from 'storyblok-react';
import React from 'react';
import { useScript } from '../../utils/hooks/useScript';
const HubspotMeeting = ({ content, disableEmbed }) => {
    const dataSrc = `https://app.hubspot.com/meetings/${content.meeting_name}?embed-true=${disableEmbed ? 'false' : 'true'}`;
    const { error } = useScript(content.meeting_name ? `https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js?id=${new Date().getTime()}` : '');
    if (error) {
        console.error('script of hubspot not loaded');
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: "lm-hubspot-meeting" },
            content.meeting_name,
            React.createElement("div", { className: "meetings-iframe-container", "data-src": dataSrc }))));
};
export default HubspotMeeting;
