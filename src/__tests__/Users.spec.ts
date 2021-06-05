// this test ensures that a user is created with all the expected values and a wallet is opened for her

import supertest from "supertest";
import { Connection, createConnection, Db, getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import app from "../server";



// test that the users Db Exix

var connection: Connection | undefined ;

beforeAll(() => {
    createConnection({
        type: "mysql",
        host: process.env.db_host || "localhost",
        port: 3306,
        username: process.env.DB_USER || "root",
        password: process.env.PASSWORD || "root",
        database: process.env.DATABASE_NAME || "bankingAppTest",
        entities: [
            __dirname + "/entity/*.ts"
        ],
        synchronize: true,
        // logging: false
    }).then(async connection => {
        connection = connection
    }).catch(error => console.log(error));

})

afterAll( async() => {
    await getConnection().close()
    console.log('connection closed')
})

describe('the Users Table is created and has the appropraite characteristics', () => {
    it('should have the users table created', async () => {
        const connect = await connection!.query(`SELECT count(*) FROM bankingApp-Test.TABLES WHERE (TABLE_NAME = 'Users')`)
        expect(connect).toBe(1);
    });

    it('should be able to save users with the respective field', async () => {

        let user = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                firstName: "Jonathan",
                lastName: "John",
                age: 40,
            })
            .execute()

        expect(user).toBeTruthy
        console.log(user)
        expect(typeof user).toBeDefined();
    })
});

describe('expect that crud operations works correctly', () => {
    it('should create Users', (done) => {
       supertest(app)
       .post('/users')
       .send({
           firstName:"Jonathan",
           lastName:"Atiene",
           age: 40,
           uuid: "34e25634"
       })
       .set("accept", "application/json")
       .expect(201, done)
    });

    it('should get user  details', (done) => {
        supertest(app)
        .get('user/34e25634')
        .expect(200).then( res => {
            expect(res.body.firstName === 'Jonathan')
            done()
        })
    });


    it('should update and delete users', (done) => {
        supertest(app)
        .patch('/users/34e25634')
        .send({
            firstName:"Jonat",
            lastName:"Atiene",
            age: 40,
            uuid: "34e25634"
        })
        .set("accept", "application/json")
        .expect(200).then (res => {
            expect(res.body.firstName).toBe("Jonat")
        })

    });


    it('should update users', (done) => {
        supertest(app)
        .patch('/users/34e25634')
        .send({
            firstName:"Jonat",
            lastName:"Atiene",
            age: 40,
            uuid: "34e25634"
        })
        .set("accept", "application/json")
        .expect(200).then (res => {
            expect(res.body.firstName).toBe("Jonat")
        })

    });

    it('should delete users', (done) => {
        supertest(app)
        .delete('/users/34e25634')
        .expect(200, done)
    });
})
