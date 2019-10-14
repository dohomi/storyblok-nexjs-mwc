/// <reference types="node" />
/// <reference types="ua-parser-js" />
import { IncomingMessage, ServerResponse } from 'http';
declare class DeviceDetect {
    private device;
    private hasWebpSupport;
    private language;
    constructor();
    getDevice(): {
        os: any;
        browser: any;
        device: any;
    };
    setAppServices(req?: IncomingMessage): void;
    getLanguage(): string;
    setLanguage(language?: string, audienceLanguages?: string, res?: ServerResponse): void;
    _getDeviceValues(parsed: IUAParser.IResult): {
        browser: string | undefined;
        os: string | undefined;
        device: string | undefined;
    };
    setDevice(req?: IncomingMessage): void;
    getWebpSupport(): boolean;
    setWebpSupport(req?: IncomingMessage): void;
    _supportsWebp(): Promise<unknown>;
}
declare const DeviceDetectService: DeviceDetect;
export default DeviceDetectService;
