var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import Components from 'components';
import SbEditable from 'storyblok-react';
import { ParallaxBanner } from 'react-scroll-parallax';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getImageAttrs } from '../../utils/ImageService';
import { getImagePromise } from '../../utils/fetchImageHelper';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var SectionParallax = function (_a) {
    var content = _a.content;
    var dimensions = useWindowDimensions();
    var _b = __read(useInView({
        triggerOnce: true
    }), 3), refIntersectionObserver = _b[0], inView = _b[1], refElement = _b[2];
    var containerEl;
    var width = dimensions.width;
    var height = dimensions.height;
    var elements = content.elements || [];
    var contentHeight = content.height;
    var _c = __read(useState([]), 2), layers = _c[0], setLayers = _c[1];
    var disableLazyLoad = content.disable_lazy_load;
    var styles = {
        minHeight: contentHeight ? contentHeight + "vh" : '50vh',
        height: '100%'
    };
    var contentClasses = clsx('parallax__content', content.class_names && content.class_names.values, {});
    // let [styles, setStyles] = useState(styles)
    useEffect(function () {
        if (disableLazyLoad) {
            processLayers(containerEl);
        }
        else if (inView) {
            refElement && processLayers(refElement.target);
        }
    }, [inView, width, height]);
    function processLayers(el) {
        var _this = this;
        var items = elements.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
            var containerHeight, offset, imgHeight, img, imgSource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        containerHeight = height * Number(contentHeight / 100);
                        offset = ((containerHeight * item.amount) * 2);
                        imgHeight = containerHeight + offset;
                        img = getImageAttrs({
                            originalSource: item.image,
                            width: width,
                            height: imgHeight,
                            smart: true,
                            focalPoint: item.image_focal_point
                        });
                        return [4 /*yield*/, getImagePromise({ src: img.src, srcSet: img.srcSet })];
                    case 1:
                        imgSource = _a.sent();
                        return [2 /*return*/, {
                                image: "\"" + imgSource + "\"",
                                amount: Number(item.amount),
                                children: item.children && item.children.length && Components(item.children[0])
                            }];
                }
            });
        }); });
        Promise.all(items)
            .then(function (layers) {
            setLayers(layers);
            el.classList.add('loaded');
        });
    }
    function setRef(ref) {
        refIntersectionObserver(ref);
        containerEl = ref;
    }
    var body = content.body || [];
    return (<SbEditable content={content}>
      <div className="lm-content-section__parallax" ref={setRef}>
        <ParallaxBanner disabled={false} style={styles} className="" layers={layers}>
          <div className={contentClasses}>
            {body.map(function (blok) { return Components(blok); })}
          </div>
        </ParallaxBanner>
      </div>
    </SbEditable>);
};
export default SectionParallax;
