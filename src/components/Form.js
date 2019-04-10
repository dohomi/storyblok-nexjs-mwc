import SbEditable from 'storyblok-react'
import {useForm} from '../utils/hooks/hubspotForm'
import {createElement} from 'react'
import Paragraph from './Paragraph'
import Components from 'components/index'
import clsx from 'clsx'
import FormSelect from './form/FormSelect'
import FormCheckbox from './form/FormCheckbox'
import FormTextfield from './form/FormTextfield'
import FormSubmitButton from './form/FormSubmitButton'
import PropTypes from 'prop-types'

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
  console.log('component not found on blok: ', blok)
  console.log('Storyblok PREVIEW and PUBLIC key: ', process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC)
  return createElement(() => (
    <div>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const Form = ({content, customData = {}, children}) => {
  const body = content.body || []
  const responseBody = content.success_body || []
  const opts = {
    api: content.api
  }

  const {data, isLoading, isError, handleSubmit} = useForm(opts)

  function onSubmit (e) {
    e.preventDefault()
    if (isLoading) return
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
    handleSubmit(e, customData)
  }

  const border = content.border || []

  const formClassName = clsx('lm-form', {
    ['lm-form__shaped']: border.includes('shaped'),
    ['lm-form__square']: border.includes('square')
  })
  if (!!data) {
    return (
      <div>
        {!responseBody.length && 'Submit is done but add better some success body in Storyblok..'}
        {responseBody.map(item => Components(item))}
      </div>
    )
  }

  return (
    <SbEditable content={content}>
      <form noValidate onSubmit={onSubmit} className={formClassName}>
        {isError && (
          <div>Form submit has error...</div>
        )}
        {body.map((item, i) => {
          return (
            <React.Fragment key={item._uid}>
              {i === body.length - 1 && children && children.map((f, q) => (
                <div className="mb-2" key={'kids__' + q + 1}>
                  {f}
                </div>
              ))}
              <div className="mb-2">
                {FormItem({
                  ...item,
                  border: border || [],
                  errorMsgRequired: content.error_msg_required,
                  errorMsgEmail: content.error_msg_email,
                  isLoading
                })}
              </div>
            </React.Fragment>
          )
        })}
      </form>
    </SbEditable>
  )
}

Form.propTypes = {
  content: PropTypes.object,
  customData: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.element)
}

export default Form
