import { MigrationInterface, QueryRunner } from "typeorm";

export class usersEntity1622877604234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE bankingApp.user
            ADD COLUMN photo varchar(225),
            ADD COLUMN document varchar(225),
            ADD COLUMN occupation varchar(225),
            ADD COLUMN email varchar(225) NOT NULL,
            ADD COLUMN phone int,
            ADD COLUMN external_id varchar(225)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE bankingApp.user 
            DROP COLUMN photo,
            DROP COLUMN document,
            DROP COLUMN occupation,
            DROP COLUMN email,
            DROP COLUMN phone,
            DROP COLUMN external_id 
        `)
    }

}
