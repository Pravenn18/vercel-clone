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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const generate_1 = require("./generate");
const simple_git_1 = __importDefault(require("simple-git"));
const getAllFiles_1 = require("./getAllFiles");
const uploadtoR2_1 = require("./uploadtoR2");
const ioredis_1 = __importDefault(require("ioredis"));
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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const id = (0, generate_1.generate)();
    console.log(id);
    yield (0, simple_git_1.default)().clone(repoUrl, `dist/output/${id}`);
    const files = (0, getAllFiles_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`));
    files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, uploadtoR2_1.uploadFile)(file.slice(__dirname.length + 1), file);
    }));
    console.log("Uploaded to R2");
    yield redis.lpush('key', id);
    res.json({
        id: id,
        status: "Uploaded to R2"
    });
}));
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
