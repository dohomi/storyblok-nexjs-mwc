import { useState } from 'react'

export function formHandling({ helpText = '', helpTextPersistent = false, errorMsgEmail, errorMsgRequired }) {
  const initialMsg = {
    children: helpText,
    persistent: helpTextPersistent,
    validationMsg: false
  }
  let [msg, setMsg] = useState(initialMsg)

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

  return { msg, onInputChange }
}
