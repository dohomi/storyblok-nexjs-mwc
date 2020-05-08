var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { existsSync, promises, unlinkSync } from 'fs';
const readFile = promises.readFile;
const writeFile = promises.writeFile;
const cacheRootPath = '';
const cacheFiles = [];
export const clearFileCache = () => {
    for (const filename of cacheFiles) {
        try {
            unlinkSync(filename);
        }
        catch (e) {
            console.log('filecache file does not exist: ' + filename);
        }
    }
};
const getFullPath = (filename) => `${cacheRootPath}${filename}.json`;
export const checkCacheFileExists = (filename) => {
    return existsSync(getFullPath(filename));
};
export const readCacheFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield readFile(getFullPath(filename), 'utf8');
    const data = JSON.parse(content);
    return data;
});
export const writeCacheFile = (filename, content) => __awaiter(void 0, void 0, void 0, function* () {
    const pathName = getFullPath(filename);
    try {
        if (!cacheFiles.includes(pathName)) {
            cacheFiles.push(pathName);
        }
        yield writeFile(pathName, JSON.stringify(content), 'utf8');
    }
    catch (e) {
        console.error(e);
    }
});
