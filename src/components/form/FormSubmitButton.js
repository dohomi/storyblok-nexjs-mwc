import {mapButtonProps} from '../Button'
import {CircularProgress} from '@rmwc/circular-progress'
import {Button} from '@rmwc/button'

const FormSubmitButton = (content) => {
  const buttonProps = mapButtonProps(content)
  if (content.isLoading) {
    buttonProps.icon = <CircularProgress/>
  }

  return <Button {...buttonProps}
                 disabled={content.isLoading}
                 type="submit"/>
}

export default FormSubmitButton
