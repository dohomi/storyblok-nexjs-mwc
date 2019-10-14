export declare function formHandling({ helpText, helpTextPersistent, errorMsgEmail, errorMsgRequired }: {
    helpText?: string;
    helpTextPersistent?: boolean;
    errorMsgEmail?: string;
    errorMsgRequired?: string;
}): {
    msg: {
        children?: string | undefined;
        validationMsg?: boolean | undefined;
        persistent?: boolean | undefined;
    };
    onInputChange: (input: HTMLInputElement) => void;
};
