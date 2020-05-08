var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const hasWebpSupport = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req) {
        // we set this and calling it in _document to set global windows variable
        return !!(req.headers.accept && req.headers.accept.includes('webp'));
    }
    else {
        const supportsWebP = function () {
            return new Promise(function (A) {
                const n = new Image;
                n.onerror = function () {
                    return A(!1);
                }, n.onload = function () {
                    return A(1 === n.width);
                }, n.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
            }).catch(function () {
                return !1;
            });
        };
        const can = yield supportsWebP();
        return !!can;
    }
});
export default hasWebpSupport;
