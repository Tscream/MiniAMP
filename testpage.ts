import express from "express";
import dbconnections from "./dbconnections";

const router = express.Router();

router.get('/', async (req: any, res: any) => {
    // console.log(req);
    // console.log(req.params);
    dbconnections.mysql;
    // dbconnections.createName("Tiyani") //creates new row with input

    try{
       let response= await dbconnections.GetAllData();
       console.log(response.name) //returns column of row (if: no column "return whole row")
    } 
    catch(e){console.error(e)}

    res.status(200).send('Got something?.')
})

router.post('/', function (req: any, res: any) {

    console.log(req.body);

    res.status(200).send('Something was posted')
})

export default router