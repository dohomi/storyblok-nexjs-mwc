import SbEditable from 'storyblok-react'
import HubSpot from 'react-hubspot-form'

import {useEffect} from 'react'

const HubspotForm = ({content}) => {
  const opts = {
    portalId: '4965341',
    formId: '7856bf18-dd63-4488-9f1d-a52427ea5f55'
  }

  return (
    <SbEditable content={content}>
      <HubSpot {...opts}
               onSubmit={() => console.debug('Submit!')}
               onReady={(form) => console.debug('Form ready!')}
               loading={<div>Loading...</div>}></HubSpot>
    </SbEditable>
  )
}

export default HubspotForm
