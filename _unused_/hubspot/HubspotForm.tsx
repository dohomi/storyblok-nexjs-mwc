import SbEditable from 'storyblok-react'
import { ChangeEvent, ComponentType, FunctionComponent } from 'react'
import cookie from 'js-cookie'
import dynamic from 'next/dynamic'
import { Checkbox } from '@rmwc/checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import Form from '../form/Form'
import FormCheckbox from '../form/FormCheckbox'
import Paragraph from '../paragraph/Paragraph'
import { HubspotFormStoryblok } from '../../typings/generated/components-schema'

const HubspotFormDyn: ComponentType<any> = dynamic(
  () => import('./ReactHubspotForm'),
  { ssr: false }
)

const HubspotFormCustom: FunctionComponent<{ content: HubspotFormStoryblok }> = ({ content }) => {
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
    legalConsentOptions: {
      consent: undefined,
      legitimateInterest: undefined
    }
  }
  const children = []

  const subscriptionTypeId = Number(content.newsletter_subscription)
  if (content.consent_process || content.consent_communication) {
    // @ts-ignore
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
    const onCommunicationChange = (ev: ChangeEvent<HTMLInputElement>) => {
      const isChecked = ev.target.checked
      // @ts-ignore
      data.legalConsentOptions.consent.communications[0].value = !!isChecked
    }
    content.consent_process && children.push(<FormCheckbox label={content.consent_process}
                                                           required={true}
                                                           component="form_checkbox"
                                                           name={'__consent_process'}
                                                           _uid={'consent_process'} />)
    content.consent_communication && children.push(<Checkbox label={content.consent_communication}
                                                             name={'__consent_communication'}
                                                             id={'consent_communication'}
                                                             value={subscriptionTypeId}
                                                             onChange={onCommunicationChange} />)
  } else if (content.legitimate_interest && content.legitimate_interest.length) {
    const legitimateProps = content.legitimate_interest[0]
    // @ts-ignore
    data.legalConsentOptions.legitimateInterest = {
      value: true,
      subscriptionTypeId: subscriptionTypeId,
      text: legitimateProps.text
    }
    console.log('some props for legitimate', legitimateProps)
    children.push(Paragraph({ content: legitimateProps }))
  }


  const formProps = {
    ...body[0],
    api: `https://api.hsforms.com/submissions/v3/integration/submit/${opts.portalId}/${opts.formId}`
  }

  return (
    <SbEditable content={content}>
      <Form content={formProps}
            customData={data}
            children={children} />
    </SbEditable>
  )

}


const HubspotForm: FunctionComponent<{ content: HubspotFormStoryblok }> = ({ content }) => {
  const opts = {
    portalId: content.portal_id,
    formId: content.form_id
  }
  const body = content.body || []
  if (body && body.length) {
    return <HubspotFormCustom content={content} />
  }

  return (
    <SbEditable content={content}>
      <HubspotFormDyn {...opts}
                      _uid={content._uid}
                      loading={<CircularProgress />} />
    </SbEditable>
  )
}

export default HubspotForm
