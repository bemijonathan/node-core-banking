import { getRepository } from "typeorm"
import { Transactions } from "../entity/Transactions"
import { User } from "../entity/User"
import { Wallet } from "../entity/wallet"
import { errorResponse } from "../utils/response"

export class WalletService {
    private userRepo() {
        return getRepository(User)
    }

    private walletRepo() {
        return getRepository(Wallet)
    }

    private transactionRepo() {
        return getRepository(Transactions)
    }

    async createWallet(userid: number) {
        try {
            const user = await this.userRepo().findOne(userid, { relations: ["wallet"] })

            if (!user) {
                throw new Error(" user not found !")
            }

            if (user.wallet) {
                throw new Error("user already has a wallet !")
            }

            console.log(user)

            const wallet = new Wallet()

            console.log(wallet.id)

            wallet.user = user
            wallet.balance = 0.00
            wallet.status = 'stale'
            wallet.walletNumber = 0


            await this.walletRepo().save(wallet)

            const data = await this.walletRepo().save({
                ...wallet,
                walletNumber: 100000000 + wallet.id
            })

            user.wallet = data

            await this.userRepo().save(user)

            return data

        } catch (error) {
            console.error(error.message)
            throw new Error(error.message)
        }
    }

    async getWallet(id: number) {
        const wallet = await this.walletRepo().findOne(id)

        return wallet
    }


    async creditWallet(id: number, amount: number, description?: string) {

        if (amount < 0.0) {
            throw new Error("amount must be greater than 0.00")
        }
        let wallet = await this.getWallet(id)
        if (!wallet) {
            throw new Error("wallet not found")
        }
        wallet!.balance += amount

        try {
            wallet = await this.walletRepo().save(wallet)
        } catch (error) {
            throw new Error('Transaction Failed')
        }

        await this.transactionRepo().save({
            wallet,
            amount,
            currentBalance: wallet.balance,
            transactionType: "credit",
            description
        })

        return wallet

    }


    async debitWallet(id: number, amount: number, description?: string) {
        if (amount < 0.0) {
            throw new Error("amount must be greater than 0.00")
        }
        let wallet = await this.getWallet(id)
        if (!wallet) {
            throw new Error("wallet not found")
        }

        if (wallet.balance < amount) {
            throw new Error("insufficient funds")
        }

        wallet!.balance -= amount

        wallet = await this.walletRepo().save(wallet)

        await this.transactionRepo().save({
            wallet,
            amount,
            currentBalance: wallet.balance,
            transactionType: "debit",
            description
        })

        return wallet
    }



}