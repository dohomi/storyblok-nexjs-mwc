import { formHandling } from '../../utils/form/formHandling'
import { Select } from '@rmwc/select'
import { FunctionComponent, useState } from 'react'
import { FormSelectOptionStoryblok, FormSelectStoryblok } from '../../typings/generated/components-schema'

const FormSelect: FunctionComponent<FormSelectStoryblok> = (content) => {
  let inputRef
  const { msg, onInputChange } = formHandling({
    helpText: content.help_text,
    helpTextPersistent: content.help_text_persistent,
    errorMsgRequired: content.errorMsgRequired,
    errorMsgEmail: content.errorMsgEmail
  })
  let [value, setValue] = useState('')
  const fieldProps = {
    id: content._uid,
    name: content.name,
    outlined: content.border.includes('outlined'),
    label: content.label,
    enhanced: false,// currently important
    required: !!content.required,
    value: value,
    options: content.options && content.options.map((i: FormSelectOptionStoryblok) => ({
      value: i.value,
      label: i.label
    })),
    inputRef: el => inputRef = el,
    helpText: msg,
    onBlur: () => onInputChange(inputRef)
  }

  function onChange(ev) {
    setValue(ev.target.value)
  }

  return <Select {...fieldProps} onChange={(ev) => onChange(ev)} />
}

export default FormSelect
