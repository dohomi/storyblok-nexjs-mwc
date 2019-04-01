import SbEditable from 'storyblok-react'
import dynamic from 'next/dynamic'
import {CircularProgress} from '@rmwc/circular-progress'
import Form from './Form'
import cookie from 'js-cookie'
import {Checkbox} from '@rmwc/checkbox'
import FormCheckbox from './form/FormCheckbox'

const HubspotFormDyn = dynamic(
  () => import('./partials/ReactHubspotForm'),
  {ssr: false}
)

const HubspotFormCustom = ({content}) => {
  const opts = {
    portalId: content.portal_id,
    formId: content.form_id
  }
  const body = content.body || []
  const data = {
    context: {
      hutk: cookie.get('hubspotutk'),
      pageUri: typeof document !== 'undefined' && document.location.href
    },
    legalConsentOptions: {}
  }
  const children = []

  const subscriptionTypeId = Number(content.newsletter_subscription)
  if (content.consent_process || conten.consent_communication) {
    data.legalConsentOptions.consent = {
      consentToProcess: true,
      text: content.consent_process,
      communications: [{
        value: false,
        // Boolean; Whether or not the visitor checked the checkbox for this subscription type.
        subscriptionTypeId: subscriptionTypeId,
        // Integer; The ID of the specific subscription type
        text: content.consent_communication
        // String; The text displayed to the visitor for this specific subscription checkbox
      }]
    }
    const onCommunicationChange = (ev) => {
      const isChecked = ev.target.checked
      data.legalConsentOptions.consent.communications[0].value = !!isChecked
    }
    content.consent_process && children.push(<FormCheckbox label={content.consent_process}
                                                           required={true}
                                                           name={'__consent_process'}
                                                           _uid={'consent_process'}/>)
    content.consent_communication && children.push(<Checkbox label={content.consent_communication}
                                                             name={'__consent_communication'}
                                                             id={'consent_communication'}
                                                             value={subscriptionTypeId}
                                                             onChange={onCommunicationChange}/>)
  } else if (content.legitimate_interest) {
    data.legalConsentOptions.legitimateInterest = {
      value: true,
      subscriptionTypeId: subscriptionTypeId,
      text: content.legitimate_interest
    }
  }

  const formProps = {
    ...body[0],
    api: `https://api.hsforms.com/submissions/v3/integration/submit/${opts.portalId}/${opts.formId}`
  }

  return (
    <SbEditable content={content}>
      <Form content={formProps}
            customData={data}
            children={children}/>
    </SbEditable>
  )

}


const HubspotForm = ({content}) => {
  const opts = {
    portalId: content.portal_id,
    formId: content.form_id
  }
  const body = content.body || []
  if (body && body.length) {
    return <HubspotFormCustom content={content}/>
  }

  return (
    <SbEditable content={content}>
      <HubspotFormDyn {...opts}
                      _uid={content._uid}
                      loading={<CircularProgress/>}/>
    </SbEditable>
  )
}

export default HubspotForm
