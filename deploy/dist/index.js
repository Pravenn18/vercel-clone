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
const ioredis_1 = __importDefault(require("ioredis"));
const fs_1 = __importDefault(require("fs"));
const uploadtoR2_1 = require("./uploadtoR2");
const getAllFiles_1 = require("./getAllFiles");
const path_1 = __importDefault(require("path"));
const redisEndpoint = 'redis-19789.c305.ap-south-1-1.ec2.redns.redis-cloud.com';
const redisPassword = 'FkT4mxFl9rSn54DUij3cAJUV5XTkP2BW';
const redis = new ioredis_1.default({
    host: redisEndpoint,
    port: 19789,
    password: redisPassword,
});
redis.on('connect', () => {
    console.log('Connected to Redis');
});
redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});
const uploadKey = "UPLOAD_KEY";
const localStoragePath = './local_storage'; // Define your local storage path here
if (!fs_1.default.existsSync(localStoragePath)) {
    fs_1.default.mkdirSync(localStoragePath, { recursive: true });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let a = 1;
        const res = '60063';
        // while(a != 0) {
        //     const res = await redis.lpop('key');
        //     if(res != null){
        //       // a = 0;
        //       setTimeout(async () => {
        //         await downloadFile(`output/${res}/`, "./dist")}
        //       ,5000)
        //     }
        //     setTimeout(async () => {
        //       if(res){
        //         buildProject(res)
        //       }
        //     },25000)
        const files = (0, getAllFiles_1.getAllFiles)(path_1.default.join(__dirname, `output/${res}/dist`));
        console.log(files);
        files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
            yield (0, uploadtoR2_1.uploadFile)(file.slice(__dirname.length + 1), file);
        }));
        // console.log(res);
    });
}
// }
main();
