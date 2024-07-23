import { S3 } from "aws-sdk";
import fs from "fs";

// replace with your own credentials
const s3 = new S3({
    accessKeyId: "fc96f236b0cd9f1ea78201ece414fd48",
    secretAccessKey: "afe39bff562b54b10eb3dac0014ebd41029ab75532536fd3b69d5f002b8280f5",
    endpoint: "https://ee517f5aa06f9055086cc7be97c6a0f7.r2.cloudflarestorage.com"
})
console.log("reached4");


// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
}