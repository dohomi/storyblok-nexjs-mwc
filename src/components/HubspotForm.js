import SbEditable from 'storyblok-react'
// import HubSpot from 'react-hubspot-form'
import {useForm} from '../utils/hooks/hubspotForm'
import {TextField} from '@rmwc/textfield'
import {Button} from '@rmwc/button'
import React, {useState, createRef} from 'react'
import {mapButtonProps} from './Button'
import {Checkbox} from '@rmwc/checkbox'
import {Select} from '@rmwc/select'

const FormSelect = (content) => {
  let [value, setValue] = useState('')
  const fieldProps = {
    id: content._uid,
    name: content.name,
    label: content.label,
    enhanced: true,// make this dependend on viewport?
    required: !!content.required,
    value: value,
    options: content.options && content.options.map(i => ({value: i.value, label: i.label}))
  }

  return <Select {...fieldProps} onChange={(ev) => setValue(ev.target.value)}/>
}

const FormCheckbox = (content) => {
  const fieldProps = {
    id: content._uid,
    name: content.name,
    label: content.label,
    required: !!content.required
  }

  return <Checkbox {...fieldProps}/>
}

const FormTextfield = (content) => {
  const inputRef = createRef()
  const initialMsg = {
    children: content.help_text,
    persistent: content.help_text_persistent,
    validationMsg: false
  }
  let [msg, setMsg] = useState(initialMsg)
  const fieldProps = {
    id: content._uid,
    name: content.name,
    label: content.label,
    type: content.type || 'text',
    required: !!content.required,
    outlined: content.outlined,
    textarea: content.textarea
  }

  function onChange () {
    const input = inputRef.current.input.ref
    if (input.type === 'email' && input.validity.typeMismatch) {
      setMsg({
        children: content.errorMsgEmail,
        validationMsg: true,
        persistent: true
      })
    } else if (input.validity.valueMissing) {
      setMsg({
        children: content.errorMsgRequired,
        validationMsg: true,
        persistent: true
      })
    } else {
      setMsg(initialMsg)
    }
  }

  return <TextField {...fieldProps}
                    ref={inputRef}
                    helpText={msg}
                    onBlur={() => onChange()}/>
}

const FormSubmitButton = (content) => {
  const buttonProps = mapButtonProps(content)


  return <Button {...buttonProps}
                 type="submit"/>
}

const FormComponents = {
  'form_textfield': FormTextfield,
  'button': FormSubmitButton,
  'form_checkbox': FormCheckbox,
  'form_select': FormSelect
}

const FormItem = (blok) => {
  if (typeof FormComponents[blok.component] !== 'undefined') {
    return React.createElement(FormComponents[blok.component], blok)
  }
  return React.createElement(() => (
    <div>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const HubspotFormHooked = ({content}) => {
  const body = content.body || []
  const opts = {
    portalId: content.portal_id,
    formId: content.form_id
  }

  const {data, isLoading, isError, handleSubmit} = useForm(opts)

  function onSubmit (e) {
    e.preventDefault()
    const form = e.target
    const elements = [...form.elements]
    elements.forEach(element => {
      element.focus()
      // element.blur()
      // element.checkValidity()
    })
    const valid = form.checkValidity()
    if (!valid) {
      return
    }
    handleSubmit(e)
  }

  console.log(isError)

  return (
    <SbEditable content={content}>
      <form noValidate onSubmit={onSubmit}>
        {isError && (
          <div>Form submit has error...</div>
        )}
        {body.map(item => (
          <div className="mb-2" key={item._uid}>
            {FormItem({
              ...item,
              outlined: content.outlined,
              errorMsgRequired: content.error_msg_required,
              errorMsgEmail: content.error_msg_email
            })}
          </div>
        ))}
      </form>
    </SbEditable>
  )
}
//
// const HubspotForm = ({content}) => {
//   const opts = {
//     portalId: content.portal_id,
//     formId: content.form_id
//   }
//   return (
//     <SbEditable content={content}>
//       <HubSpot {...opts}
//                onSubmit={() => console.debug('Submit!')}
//                onReady={(form) => console.debug('Form ready!')}
//                loading={<div>Loading...</div>}></HubSpot>
//     </SbEditable>
//   )
// }

export default HubspotFormHooked
