import { formHandling } from './formHandling'
import { Checkbox } from '@rmwc/checkbox'
import { TextFieldHelperText } from '@rmwc/textfield'
import { FunctionComponent } from 'react'
import { FormCheckboxStoryblok } from '../../typings/generated/components-schema'

const FormCheckbox: FunctionComponent<FormCheckboxStoryblok> = (content) => {
  // todo: currently no validation msg for checkboxes
  let inputRef
  const { msg, onInputChange } = formHandling({
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
    onBlur: () => onInputChange(inputRef),
    onChange: undefined
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
      <Checkbox {...fieldProps} className={className} />
      {msg.children && <TextFieldHelperText {...msg} />}
    </>
  )
}

export default FormCheckbox
