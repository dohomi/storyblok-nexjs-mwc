import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Swipe from './ImageListLightboxSwipe';
import { Close } from 'mdi-material-ui';
var ImageListLightbox = function (props) {
    return (React.createElement(Dialog, { fullScreen: true, className: props.className, onEscapeKeyDown: function () { return props.setLightbox(); }, open: !!props.lightbox },
        React.createElement(DialogTitle, null,
            React.createElement(IconButton, { className: "text-white", onClick: function () { return props.setLightbox(); } },
                React.createElement(Close, null))),
        Swipe(props)));
};
export default ImageListLightbox;
