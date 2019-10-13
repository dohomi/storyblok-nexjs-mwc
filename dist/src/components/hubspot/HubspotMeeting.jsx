import SbEditable from 'storyblok-react';
import { useEffect } from 'react';
var HubspotMeeting = function (_a) {
    var content = _a.content, disableEmbed = _a.disableEmbed;
    var dataSrc = "https://app.hubspot.com/meetings/" + content.meeting_name + "?embed=" + (disableEmbed ? 'false' : 'true');
    useEffect(function () {
        var script = document.createElement('script');
        script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);
    return (<SbEditable content={content}>
      <div className="lm-hubspot-meeting">
        <div className="meetings-iframe-container" data-src={dataSrc}></div>
      </div>
    </SbEditable>);
};
export default HubspotMeeting;
