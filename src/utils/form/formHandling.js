import {useState} from 'react'

/**
 *
 * @param helpText
 * @param helpTextPersistent
 * @param errorMsgEmail
 * @param errorMsgRequired
 * @return {{msg: {validationMsg: boolean, children: string, persistent: boolean}, onInputChange: onInputChange}}
 */
export function formHandling ({helpText = '', helpTextPersistent = false, errorMsgEmail, errorMsgRequired}) {
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
