// this test ensures that a user is created with all the expected values and a wallet is opened for her

import supertest from "supertest";
import { Connection, createConnection, Db, getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import app from "../server";



// test that the users Db Exix

const userObject = {
    "email": "testsdfdf@jonathan.com",
    "lastName": "Jona",
    "external_id": "23452345dsgs",
    "photo": "https://tpyasdfadsf.com/asdfsd.jpg",
    "document": "",
    "occupation": "Teacher",
    "phone": "9348205346"
}

beforeAll(async () => {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "bankingAppTest",
        entities: [
            User
        ],
        synchronize: true,
        // logging: true
    })

})

afterAll(async () => {
    await getConnection().dropDatabase()
    await getConnection().close()
    console.log('connection closed')
})

describe('the Users Table is created and has the appropraite characteristics', () => {
    it('should have the users table created', async () => {
        const connect = await getRepository(User).query(`SELECT count(*) FROM bankingAppTest.user`)
        expect(+connect[0]["count(*)"]).toBe(0);
    });

    // it('should be able to save users with the respective field', async () => {

    //     let user = await getConnection()
    //         .createQueryBuilder()
    //         .insert()
    //         .into(User)
    //         .values({
    //             firstName: "Jonathan",
    //             lastName: "John",
    //             age: 40,
    //         })
    //         .execute()

    //     expect(user).toBeTruthy
    //     console.log(user)
    //     expect(typeof user).toBeDefined();
    // })
});

describe('expect that crud operations works correctly', () => {
    it('should create Users', (done) => {
        supertest(app)
            .post('/user')
            .send(userObject)
            .set("accept", "application/json")
            .expect(201, done)
    });

    it('should get user  details', (done) => {
        supertest(app)
            .get('/user/1')
            .expect(200).then(res => {
                expect(res.body.firstName).toBeFalsy()
                done()
            })
    });


    it('should update and delete users', (done) => {
        supertest(app)
            .patch('/user/1')
            .send({
                photo: userObject.photo + 'Help.png'
            })
            .set("accept", "application/json")
            .expect(200, done)
    });


    it('should update users', (done) => {
        supertest(app)
            .patch('/user/1')
            .send({
                firstName: "Jonat",
            })
            .set("accept", "application/json")
            .expect(200).then(res => {
                expect(res.body.data.firstName).toBe("Jonat")
                done()
            })


    });

    it('should delete users', (done) => {
        supertest(app)
            .delete('/user/1')
            .expect(200, done)
    });
})
