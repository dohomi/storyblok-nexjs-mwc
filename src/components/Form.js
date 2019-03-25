import SbEditable from 'storyblok-react'
import {useForm} from '../utils/hooks/hubspotForm'
import {TextField, TextFieldHelperText} from '@rmwc/textfield'
import {Button} from '@rmwc/button'
import {useState, createElement} from 'react'
import {mapButtonProps} from './Button'
import {Checkbox} from '@rmwc/checkbox'
import {Select} from '@rmwc/select'
import Paragraph from './Paragraph'

/**
 *
 * @param helpText
 * @param helpTextPersistent
 * @param errorMsgEmail
 * @param errorMsgRequired
 * @return {{msg: {validationMsg: boolean, children: string, persistent: boolean}, onInputChange: onInputChange}}
 */
export const formHandling = ({helpText = '', helpTextPersistent = false, errorMsgEmail, errorMsgRequired}) => {
  const initialMsg = {
    children: helpText,
    persistent: helpTextPersistent,
    validationMsg: false
  }
  let [msg, setMsg] = useState(initialMsg)

  /**
   * Todo: add more validations
   * @param input
   */
  const onInputChange = (input) => {
    if (input.type === 'email' && input.validity.typeMismatch) {
      setMsg({
        children: errorMsgEmail,
        validationMsg: true,
        persistent: true
      })
    } else if (input.validity.valueMissing) {
      setMsg({
        children: errorMsgRequired,
        validationMsg: true,
        persistent: true
      })
    } else {
      setMsg(initialMsg)
    }
  }


  return {msg, onInputChange}
}

const FormSelect = (content) => {
  let inputRef
  const {msg, onInputChange} = formHandling({
    helpText: content.help_text,
    helpTextPersistent: content.help_text_persistent,
    errorMsgRequired: content.errorMsgRequired,
    errorMsgEmail: content.errorMsgEmail
  })
  let [value, setValue] = useState('')
  const fieldProps = {
    id: content._uid,
    name: content.name,
    outlined: content.outlined,
    label: content.label,
    enhanced: false,// currently important
    required: !!content.required,
    value: value,
    options: content.options && content.options.map(i => ({value: i.value, label: i.label})),
    inputRef: el => inputRef = el,
    helpText: msg,
    onBlur: () => onInputChange(inputRef)
  }

  function onChange (ev) {
    setValue(ev.target.value)
  }

  return <Select {...fieldProps} onChange={(ev) => onChange(ev)}/>
}

const FormCheckbox = (content) => {
  // todo: currently no validation msg for checkboxes
  let inputRef
  const {msg, onInputChange} = formHandling({
    helpText: content.help_text,
    helpTextPersistent: content.help_text_persistent,
    errorMsgRequired: content.errorMsgRequired,
    errorMsgEmail: content.errorMsgEmail
  })

  const fieldProps = {
    id: content._uid,
    name: content.name,
    label: content.label,
    required: !!content.required,
    inputRef: el => inputRef = el,
    onBlur: () => onInputChange(inputRef)
  }
  return (
    <>
      <Checkbox {...fieldProps}/>
      <TextFieldHelperText {...msg}/>
    </>
  )
}

const FormTextfield = (content) => {
  let inputRef
  const {msg, onInputChange} = formHandling({
    helpText: content.help_text,
    helpTextPersistent: content.help_text_persistent,
    errorMsgRequired: content.errorMsgRequired,
    errorMsgEmail: content.errorMsgEmail
  })

  const fieldProps = {
    id: content._uid,
    name: content.name,
    label: content.label,
    type: content.type || 'text',
    required: !!content.required,
    outlined: content.outlined,
    textarea: content.textarea,
    inputRef: el => inputRef = el,
    helpText: msg,
    onBlur: () => onInputChange(inputRef)
  }

  return <TextField {...fieldProps}/>
}

const FormSubmitButton = (content) => {
  const buttonProps = mapButtonProps(content)
  return <Button {...buttonProps}
                 disabled={content.isLoading}
                 type="submit"/>
}

const ParagraphElement = (content) => Paragraph({content})

const FormComponents = {
  'form_textfield': FormTextfield,
  'button': FormSubmitButton,
  'form_checkbox': FormCheckbox,
  'form_select': FormSelect,
  'paragraph': ParagraphElement
}

const FormItem = (blok) => {
  if (typeof FormComponents[blok.component] !== 'undefined') {
    return createElement(FormComponents[blok.component], blok)
  }
  return createElement(() => (
    <div>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const Form = ({content}) => {
  const body = content.body || []
  const opts = {
    api: content.api
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

  return (
    <SbEditable content={content}>
      <form noValidate onSubmit={!isLoading && onSubmit} className="lm-hubspot-form">
        {isError && (
          <div>Form submit has error...</div>
        )}
        {body.map(item => (
          <div className="mb-2" key={item._uid}>
            {FormItem({
              ...item,
              outlined: content.outlined,
              errorMsgRequired: content.error_msg_required,
              errorMsgEmail: content.error_msg_email,
              isLoading
            })}
          </div>
        ))}
      </form>
    </SbEditable>
  )
}

export default Form
