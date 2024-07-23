import Redis from 'ioredis';
import { downloadFile } from './downloadFromR2';
import fs from 'fs';
import { buildProject } from './build';
import { uploadFile } from './uploadtoR2';
import { getAllFiles } from './getAllFiles';
import path from 'path';


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
const localStoragePath = './local_storage'; // Define your local storage path here

if (!fs.existsSync(localStoragePath)) {
  fs.mkdirSync(localStoragePath, { recursive: true });
}

async function main() {
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
        const files = getAllFiles(path.join(__dirname, `output/${res}/dist`));
        console.log(files);
        files.forEach(async (file) => {
          await uploadFile(file.slice(__dirname.length + 1), file);
        });
        // console.log(res);
    }
// }
main();