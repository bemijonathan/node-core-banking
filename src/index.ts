import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import app from "./server";

createConnection({
    type: "mysql",
    host: process.env.db_host,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    // synchronize: true,
    // logging: false
}).then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));


const PORT: number | string = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log("app is running on port =", PORT)
})
