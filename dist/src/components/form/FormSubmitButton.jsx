import { mapButtonProps } from '../button/Button';
import { CircularProgress } from '@rmwc/circular-progress';
import { Button } from '@rmwc/button';
var FormSubmitButton = function (content) {
    var buttonProps = mapButtonProps(content);
    if (content.isLoading) {
        buttonProps.icon = <CircularProgress />;
    }
    return <Button {...buttonProps} disabled={content.isLoading} type="submit"/>;
};
export default FormSubmitButton;
