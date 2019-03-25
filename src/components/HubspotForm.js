import SbEditable from 'storyblok-react'
import dynamic from 'next/dynamic'

const HubspotFormDyn = dynamic(
  () => import('./partials/ReactHubspotForm'),
  {ssr: false}
)


const HubspotForm = ({content}) => {
  const opts = {
    portalId: content.portal_id,
    formId: content.form_id
  }
  return (
    <SbEditable content={content}>
      <HubspotFormDyn {...opts}
                      _uid={content._uid}
                      loading={<div>Loading...</div>}/>
    </SbEditable>
  )
}

export default HubspotForm
