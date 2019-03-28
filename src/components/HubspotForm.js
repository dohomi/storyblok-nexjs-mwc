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


const HubspotForm = ({content}) => {
  const opts = {
    portalId: content.portal_id,
    formId: content.form_id
  }
  const body = content.body || []
  if (body && body.length) {

    const data = {
      submittedAt: Date.now(),
      context: {
        hutk: cookie.get('hubspotutk'),
        pageUri: typeof document !== 'undefined' && document.location.href
      },
      legalConsentOptions: {}
    }
    const children = []

    if (content.consent_process || conten.consent_communication) {
      data.legalConsentOptions.consent = {
        consentToProcess: true,
        text: content.consent_process,
        communications: [{
          value: false,
          // Boolean; Whether or not the visitor checked the checkbox for this subscription type.
          subscriptionTypeId: content.newsletter_subscription,
          // Integer; The ID of the specific subscription type
          text: content.consent_communication
          // String; The text displayed to the visitor for this specific subscription checkbox
        }]
      }

      const onCommunicationChange = (ev) => {
        const isChecked = ev.target.checked
        data.legalConsentOptions.communications[0].value = !!isChecked
      }

      content.consent_process && children.push(<FormCheckbox errorMsgRequired={'You must agree'}
                                                             label={content.consent_process} required={true}
                                                             name={'consent_process'} _uid={'consent_process'}/>)
      content.consent_communication && children.push(<Checkbox label={content.consent_communication}
                                                               name={'consent_communication'}
                                                               id={'consent_communication'}
                                                               value={content.newsletter_subscription}
                                                               onChange={onCommunicationChange}/>)
    } else if (content.legitimate_interest) {

    }


    const formProps = {
      ...body[0],
      api: `https://api.hsforms.com/submissions/v3/integration/submit/${opts.portalId}/${opts.formId}`,
      data: data,
      children
    }

    return (
      <SbEditable content={content}>
        <Form content={formProps}/>
      </SbEditable>
    )
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
