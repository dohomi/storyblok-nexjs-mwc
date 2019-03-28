import {formHandling} from '../../utils/form/formHandling'
import {Checkbox} from '@rmwc/checkbox'
import {TextFieldHelperText} from '@rmwc/textfield'

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
  if (content.onChange) {
    fieldProps.onChange = (ev) => content.onChange(ev.target.value)
  }
  let className = ''
  if (msg.validationMsg) {
    className = 'lm-checkbox-failed'
  } else {
    className = ''
  }
  return (
    <>
      <Checkbox {...fieldProps} className={className}/>
      <TextFieldHelperText {...msg}/>
    </>
  )
}

export default FormCheckbox
