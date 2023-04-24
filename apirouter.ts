import express, { response } from "express";
import fs from "fs";
import { resolve } from "path";

const router = express.Router();
const basePathImages = "localhost:3000/"

router.get("/", (req,res) => {
    res.send("router works")
})

function fetchFiles(folder:string){
    return new Promise((resolve,reject) => {
        let promiseArray:Array<any> = [];
        fs.readdir(`./public/${folder}`, async (err, files) => {
            if(files.length == 1){
                promiseArray.push(`${basePathImages}${folder}/${files}`)
            }
            else if (files.length >1){
                files.forEach(file => {
                    promiseArray.push(`${basePathImages}${folder}/${file}`)
                })
            }
            else {
                promiseArray.push("file not found")
            }
            if(err){
                reject(new Error("Something went wrong"))
            }
            let result = await Promise.all(promiseArray)
            resolve(result)
        });
    })
}

router.get("/head", async (req,res) => {
    const folder = "head"

    let responseJSON = await fetchFiles(folder);

    console.log(responseJSON)
    res.send(responseJSON);
});

router.get("/body", async (req, res) => {
    const folder = "body"
    
    let responseJSON =  await fetchFiles(folder);

    console.log(responseJSON)
    res.send(responseJSON)
});

router.get("/legs", async(req,res) => {
    const folder = "legs"

    let responseJSON = await fetchFiles(folder);

    console.log(responseJSON)
    res.send(responseJSON)
});


export default router
