import SbEditable from 'storyblok-react'
import { FunctionComponent, useEffect } from 'react'
import { HubspotMeetingStoryblok } from '../../typings/generated/components-schema'

const HubspotMeeting: FunctionComponent<{
  content: HubspotMeetingStoryblok
  disableEmbed?: boolean
}> = ({ content, disableEmbed }) => {
  const dataSrc = `https://app.hubspot.com/meetings/${content.meeting_name}?embed-true=${disableEmbed ? 'false' : 'true'}`
  useEffect(
    () => {
      const script = document.createElement('script')
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
      script.async = true
      document.body.appendChild(script)
    },
    []
  )

  return (
    <SbEditable content={content}>
      <div className="lm-hubspot-meeting">
        <div className="meetings-iframe-container"
             data-src={dataSrc}></div>
      </div>
    </SbEditable>
  )
}

export default HubspotMeeting
