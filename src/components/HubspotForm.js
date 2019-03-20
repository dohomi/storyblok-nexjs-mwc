import SbEditable from 'storyblok-react'
import HubSpot from 'react-hubspot-form'

import {useEffect} from 'react'

const HubspotForm = ({content}) => {
  const opts = {
    portalId: content.portal_id,
    formId: content.form_id
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
