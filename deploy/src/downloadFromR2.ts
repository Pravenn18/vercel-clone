import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";

// replace with your own credentials
const s3 = new S3({
    accessKeyId: "fc96f236b0cd9f1ea78201ece414fd48",
    secretAccessKey: "afe39bff562b54b10eb3dac0014ebd41029ab75532536fd3b69d5f002b8280f5",
    endpoint: "https://ee517f5aa06f9055086cc7be97c6a0f7.r2.cloudflarestorage.com"
})
console.log("reached4");


// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const downloadFile = async (prefix: string, localStoragePath: string) => {
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel",
        Prefix: prefix
    }).promise();
    if (!allFiles.Contents) {
        console.log("No files found");
        return;
    }

    for (const file of allFiles.Contents) {
        if (file.Key) {
            const fileContent = await s3.getObject({ Bucket: "vercel", Key: file.Key }).promise();
            const localFilePath = path.join(localStoragePath, file.Key);

             const localDir = path.dirname(localFilePath);
             if (!fs.existsSync(localDir)) {
                 fs.mkdirSync(localDir, { recursive: true });
             }

            if (fileContent.Body instanceof Buffer) {
                fs.writeFileSync(localFilePath, fileContent.Body);
                console.log(`File saved locally at ${localFilePath}`);
            } else {
                console.error(`Failed to download ${file.Key}`);
            }
        }
    }
}