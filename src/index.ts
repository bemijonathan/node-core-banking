import dotenv from 'dotenv'
dotenv.config()
import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./server";
import * as dbconfig from "../ormconfig.json"

createConnection({
    ...dbconfig as any,
    synchronize: true,
    useSoftDelete: true
}).then()

const PORT: number | string = process.env.PORT || 4000;

app.listen(PORT, async () => {
    // await connection()
    console.log("app is running on port =", PORT);
});


// TODO: add card to borrow money 
// TODO: pay back from card 
// TODO: get credit details
// TODO: get initial money from card