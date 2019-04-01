import SbEditable from 'storyblok-react'
import {useEffect} from 'react'

const HubspotMeeting = ({content}) => {
  const dataSrc = `https://app.hubspot.com/meetings/${content.meeting_name}?embed=true`
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
