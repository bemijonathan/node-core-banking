import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserInterface } from "../types/user";

@Entity()
export class User  {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    @Column()
    photo!: string;
    @Column()
    document!: string;
    @Column()
    occupation!: string;
    @Column()
    email!: string;
    @Column()
    phone!: string;
    @Column()
    external_id!: string;
}
