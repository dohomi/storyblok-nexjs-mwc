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
import React from 'react';
import Head from 'next/head';
import Components from 'components';
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider';
import Layout from '../components/layout/Layout';
var statusCodes = {
    400: 'Bad Request',
    401: 'Not Authorized | Invalid API key',
    404: 'This page could not be found',
    500: 'Internal Server Error',
    501: 'Not Implemented'
};
var Error = function (props) {
    var statusCode = props.statusCode, page = props.page, settings = props.settings;
    var title = statusCodes[statusCode] || 'An unexpected error has occurred';
    if (statusCode === 401) {
        console.log('error on Storyblok PREVIEW and PUBLIC token:', process.env.NODE_ENV, process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC);
    }
    return (<>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" key="viewport"/>
        <meta key="robots" name="robots" content="noindex"/>
      </Head>
      <WindowDimensionsProvider>
        <Layout settings={settings || {}}>
          {page && page.pageContent && Components(page.pageContent)}
          {!page && (<div>
                <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }}/>
                {statusCode ? <h1>{statusCode}</h1> : null}
                <div>
                  <h2>{title}.</h2>
                </div>
              </div>)}
        </Layout>
      </WindowDimensionsProvider>
    </>);
};
Error.getInitialProps = function (_a) {
    var res = _a.res, err = _a.err;
    return __awaiter(void 0, void 0, void 0, function () {
        var statusCode;
        return __generator(this, function (_b) {
            statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
            return [2 /*return*/, { statusCode: statusCode }];
        });
    });
};
export default Error;
