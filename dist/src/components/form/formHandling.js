var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { useState } from 'react';
export function formHandling(_a) {
    var _b = _a.helpText, helpText = _b === void 0 ? '' : _b, _c = _a.helpTextPersistent, helpTextPersistent = _c === void 0 ? false : _c, errorMsgEmail = _a.errorMsgEmail, errorMsgRequired = _a.errorMsgRequired;
    var initialMsg = {
        children: helpText,
        persistent: helpTextPersistent,
        validationMsg: false
    };
    var _d = __read(useState(initialMsg), 2), msg = _d[0], setMsg = _d[1];
    var onInputChange = function (input) {
        if (input.type === 'email' && input.validity.typeMismatch) {
            setMsg({
                children: errorMsgEmail,
                validationMsg: true,
                persistent: true
            });
        }
        else if (input.validity.valueMissing) {
            setMsg({
                children: errorMsgRequired,
                validationMsg: true,
                persistent: true
            });
        }
        else {
            setMsg(initialMsg);
        }
    };
    return { msg: msg, onInputChange: onInputChange };
}
