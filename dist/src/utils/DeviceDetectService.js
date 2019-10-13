import parser from 'ua-parser-js';
var DeviceDetect = /** @class */ (function () {
    function DeviceDetect() {
        this.device = {
            os: null,
            browser: null,
            device: null
        };
        this.hasWebpSupport = false;
        this.language = '';
    }
    DeviceDetect.prototype.getDevice = function () {
        return this.device;
    };
    DeviceDetect.prototype.setAppServices = function (req) {
        this.setDevice(req);
        this.setWebpSupport(req);
    };
    DeviceDetect.prototype.getLanguage = function () {
        return this.language;
    };
    DeviceDetect.prototype.setLanguage = function (language, audienceLanguages, res) {
        if (language) {
            this.language = language;
        }
        if (res && audienceLanguages) {
            res.setHeader('Content-Language', Array.isArray(audienceLanguages) ? audienceLanguages.join(',') : audienceLanguages);
        }
    };
    DeviceDetect.prototype._getDeviceValues = function (parsed) {
        return {
            browser: parsed.browser.name,
            os: parsed.os.name,
            device: parsed.device.type
        };
    };
    DeviceDetect.prototype.setDevice = function (req) {
        if (req) {
            // we set this and calling it in _document to set global windows variable
            var userAgent = req.headers['user-agent'];
            // @ts-ignore
            var parsed = userAgent && parser(userAgent);
            this.device = this._getDeviceValues(parsed);
        }
        else {
            // @ts-ignore
            // this.device = this._getDeviceValues(parser())
            // (window as any)['userDevice'] = { ...this.device }
        }
    };
    DeviceDetect.prototype.getWebpSupport = function () {
        return this.hasWebpSupport;
    };
    DeviceDetect.prototype.setWebpSupport = function (req) {
        var _this = this;
        if (req) {
            // we set this and calling it in _document to set global windows variable
            this.hasWebpSupport = !!(req.headers.accept && req.headers.accept.includes('webp'));
        }
        else {
            this._supportsWebp()
                .then(function (can) {
                _this.hasWebpSupport = !!can;
                // @ts-ignore
                window['hasWebpSupport'] = !!can;
            });
        }
    };
    DeviceDetect.prototype._supportsWebp = function () {
        return new Promise(function (resolve) {
            var image = new Image();
            image.onerror = function () {
                return resolve(false);
            };
            image.onload = function () {
                return resolve(image.width === 1);
            };
            image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
        }).catch(function () {
            return false;
        });
    };
    return DeviceDetect;
}());
var DeviceDetectService = new DeviceDetect();
export default DeviceDetectService;
