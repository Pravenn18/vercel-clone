import express from "express";
import cors from 'cors';
import path from "path";
import { generate } from "./generate";
import simpleGit from "simple-git";
import { getAllFiles } from "./getAllFiles";
import { uploadFile } from "./uploadtoR2";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/url', async(req, res) => {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const id = generate();
    console.log(id);

    await simpleGit().clone(repoUrl, `dist/output/${id}`);
    const files = getAllFiles(path.join(__dirname, `output/${id}`));

    files.forEach(async (file) => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    })
    console.log("Uploaded to R2");
    res.json({
        id: id
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});