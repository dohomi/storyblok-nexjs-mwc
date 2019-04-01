import SbEditable from 'storyblok-react'
import {useState, useEffect} from 'react'


const HubspotMeeting = ({content}) => {

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(
    () => {
      const script = document.createElement('script')
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
      script.async = true
      document.body.appendChild(script)
      script.onload = () => {
        setIsLoaded(true)
      }
    },
    []
  )

  return (
    <SbEditable content={content}>
      <div className="lm-hubspot-meeting">
        {isLoaded && (
          <div className="meetings-iframe-container"
               data-src="https://blog.commercecentric.com/meetings/phil132?embed=true"></div>

        )}
      </div>
    </SbEditable>
  )
}

export default HubspotMeeting
