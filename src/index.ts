import dotenv from 'dotenv'
dotenv.config()
import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./server";

createConnection({
    type: "mysql",
    host: process.env.db_host || "localhost",
    port: 3306,
    username: process.env.DB_USER || "root",
    password: process.env.PASSWORD || "root",
    database: process.env.DATABASE_NAME || "bankingApp",
    entities: [
        `${__dirname}/entity/*.ts`,
    ],
}).then(async (connection) => {
    (global as any).connection  = connection
}).catch((error) => console.log(error));

const PORT: number | string = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("app is running on port =", PORT);
});
