export declare const clearFileCache: () => void;
export declare const checkCacheFileExists: (filename: string) => boolean;
export declare const readCacheFile: (filename: string) => Promise<any>;
export declare const writeCacheFile: (filename: string, content: any) => Promise<void>;
