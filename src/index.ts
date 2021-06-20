import dotenv from 'dotenv'
dotenv.config()
import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./server";

createConnection().then()

const PORT: number | string = process.env.PORT || 4000;

app.listen(PORT, async () => {
    // await connection()
    console.log("app is running on port =", PORT);
});
