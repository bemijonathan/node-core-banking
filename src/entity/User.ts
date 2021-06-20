import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserInterface } from "../types/user";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    firstName!: string;

    @Column({ nullable: true })
    lastName!: string;

    @Column({ nullable: true })
    age!: number;

    @Column({ nullable: true })
    photo!: string;
    @Column({ nullable: true })
    document!: string;
    @Column({ nullable: true })
    occupation!: string;
    @Column()
    email!: string;
    @Column({ nullable: true })
    phone!: string;
    @Column({ nullable: true })
    external_id!: string;
}
