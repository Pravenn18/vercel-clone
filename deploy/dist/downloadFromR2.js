"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// replace with your own credentials
const s3 = new aws_sdk_1.S3({
    accessKeyId: "fc96f236b0cd9f1ea78201ece414fd48",
    secretAccessKey: "afe39bff562b54b10eb3dac0014ebd41029ab75532536fd3b69d5f002b8280f5",
    endpoint: "https://ee517f5aa06f9055086cc7be97c6a0f7.r2.cloudflarestorage.com"
});
console.log("reached4");
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
const downloadFile = (prefix, localStoragePath) => __awaiter(void 0, void 0, void 0, function* () {
    const allFiles = yield s3.listObjectsV2({
        Bucket: "vercel",
        Prefix: prefix
    }).promise();
    if (!allFiles.Contents) {
        console.log("No files found");
        return;
    }
    for (const file of allFiles.Contents) {
        if (file.Key) {
            const fileContent = yield s3.getObject({ Bucket: "vercel", Key: file.Key }).promise();
            const localFilePath = path_1.default.join(localStoragePath, file.Key);
            const localDir = path_1.default.dirname(localFilePath);
            if (!fs_1.default.existsSync(localDir)) {
                fs_1.default.mkdirSync(localDir, { recursive: true });
            }
            if (fileContent.Body instanceof Buffer) {
                fs_1.default.writeFileSync(localFilePath, fileContent.Body);
                console.log(`File saved locally at ${localFilePath}`);
            }
            else {
                console.error(`Failed to download ${file.Key}`);
            }
        }
    }
});
exports.downloadFile = downloadFile;
