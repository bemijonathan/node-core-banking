import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { UserInterface } from "../types/user";
import { Transactions } from "./Transactions";
import { Wallet } from "./wallet";

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

    @OneToOne(() => Wallet, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    wallet!: Wallet

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deletedAt!: Date
}
