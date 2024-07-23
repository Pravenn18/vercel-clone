import express from "express";
import cors from 'cors';
import path from "path";
import { generate } from "./generate";
import simpleGit from "simple-git";
import { getAllFiles } from "./getAllFiles";
import { uploadFile } from "./uploadtoR2";
import Redis from 'ioredis';

const redisEndpoint = 'redis-19789.c305.ap-south-1-1.ec2.redns.redis-cloud.com';
const redisPassword = 'FkT4mxFl9rSn54DUij3cAJUV5XTkP2BW';

const redis = new Redis({
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

const app = express();
app.use(cors());
app.use(express.json());

app.post('/url', async (req, res) => {
  const repoUrl = req.body.repoUrl;
  console.log(repoUrl);
  const id = generate();
  console.log(id);

  await simpleGit().clone(repoUrl, `dist/output/${id}`);
  const files = getAllFiles(path.join(__dirname, `output/${id}`));

  files.forEach(async (file) => {
    await uploadFile(file.slice(__dirname.length + 1), file);
  });
  console.log("Uploaded to R2");
  await redis.lpush('key', id);
    res.json({
    id: id,
    status: "Uploaded to R2"
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
