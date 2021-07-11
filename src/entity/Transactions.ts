import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Wallet } from "./wallet";


@Entity()
export class Transactions {
    @Column()
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column({
        type: "enum", enum: {
            debit: "debit",
            credit: "credit"
        }
    })
    transactionType!: "credit" | "debit"

    @ManyToOne(() => Wallet)
    @JoinColumn()
    wallet!: Wallet

    @Column()
    amount!: number

    @Column()
    currentBalance!: number

    @Column()
    description?: string
}