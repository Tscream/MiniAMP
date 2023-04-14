// import express from "express";
// import db, { GetAllPlayers } from "./dbconnections";

// const router = express.Router();

// router.get('/', async (req: any, res: any) => {
//     try{
//        let players = await GetAllPlayers();
//        console.log(players[0].name) //returns column of row (if: no column "return whole row")
//     } catch(e){
//         res.status(500).send('Something broke!')
//         console.error(e)
//     }

//     res.status(200).send('Got something?.')
// })

// router.post('/', function (req: any, res: any) {

//     console.log(req.body);

//     res.status(200).send('Something was posted')
// })

// export default router