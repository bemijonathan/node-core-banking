import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transactions } from "./Transactions";
import { User } from "./User";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    balance!: number

    @OneToOne(() => User)
    @JoinColumn()
    user!: User

    @Column()
    walletNumber!: number

    @Column({ nullable: false })
    status!: 'active' | 'disabled' | 'stale'


    @OneToMany(() => Transactions, transaction => transaction.wallet )
    @JoinColumn()
    transaction!: Transactions

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}