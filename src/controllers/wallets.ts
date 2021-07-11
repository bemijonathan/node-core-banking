import { Request, Response } from "express"
import { getRepository, Repository } from "typeorm"
import { log } from "winston"
import { User } from "../entity/User"
import { Wallet } from "../entity/wallet"
import { WalletService } from "../services/wallets"
import { configurations } from "../utils/config"
import { errorResponse, successRes } from "../utils/response"

class WalletController {

    private Repo(ty: "user" | "wallet"): Repository<any> {
        const t = {
            user: User,
            wallet: Wallet
        }
        return getRepository(t[ty])
    }

    private walletService = new WalletService()

    getAll = async (req: Request, res: Response) => {
        try {
            const wallets = await this.Repo("user").query(`
                SELECT * FROM bankingApp.wallet w 
                INNER JOIN bankingApp.user u 
                ON u.id = w.userId
            `)

            successRes(res, [...wallets], "success", 200)

            return wallets

        } catch (error) {
            log({ level: "debug", message: error.message })
            return errorResponse(res, "server error", 500)
        }
    }

    createWallet = async (req: Request, res: Response) => {
        try {
            const { user_id } = req.body

            const user = await this.Repo("user").query(`
                SELECT * from user where id = ${user_id}
            `)

            if (!user) {
                return errorResponse(res, "user not found", 404)
            }

            const wallet = await this.walletService.createWallet(user_id)

            if (!wallet) {
                return errorResponse(res, "unable to create wallet", 400)
            }
            return successRes(res, { wallet }, "successfully created wallet")

        } catch (error) {
            log({ level: "debug", message: error.message })
            return errorResponse(res, error.message || "failed to create the wallet", 500)
        }
    }

    withDrawFromWallet = async (req: Request, res: Response) => {
        try {
            const { amount, type, description, user_id } = req.body

            let user = await this.Repo("user").findOne(user_id, {
                relations: ["wallet"]
            })

            console.log(user)

            if (!user) {
                return errorResponse(res, "user does not exist !", 404)
            }

            if (!user.wallet) {
                user.wallet = await this.walletService.createWallet(user_id)
                user = await this.Repo("user").save(user)
            }

            if (!user.wallet) {
                console.log("wallet not found")
                throw new Error("unable to find wallet")
            }

            if (type === configurations.withdraw) {
                // change to queue 
                user.wallet = await this.walletService.debitWallet(user.wallet.id, amount, description)
            }

            if (type === configurations.deposit) {
                user.wallet = await this.walletService.creditWallet(user.wallet.id, amount, description)
            }

            return successRes(res, user.wallet, "successfully completed Transactions", 200)

        } catch (error) {
            log({ level: "debug", message: error.message })
            return errorResponse(res, error.message || "failed to complete transactions please try again later", 500)
        }
    }


    transfer = async (req: Request, res: Response) => {
        try {
            const { destination_wallet_no, from_destination, description, amount } = req.body

            const DestWallet = await this.Repo("wallet").findOne({
                where: {
                    walletNumber: destination_wallet_no
                }
            })

            if (!DestWallet) {
                return errorResponse(res, "destinations wallet not found!", 400)
            }

            const fromWallet = await this.Repo("wallet").findOne({
                where: {
                    walletNumber: from_destination
                }
            })

            if (!fromWallet) {
                return errorResponse(res, "senders wallet not found!", 400)
            }

            try {
                this.walletService.debitWallet(
                    fromWallet.id,
                    amount,
                    description || `transfer to ${DestWallet!.walletNumber}`,
                )
            } catch (error) {
                // Please change to transactions
                return errorResponse(res, "failed to initiate transfer")
            }

            try {
                this.walletService.creditWallet(
                    DestWallet.id,
                    amount,
                    description || `transfer from ${fromWallet!.walletNumber}`
                )
            } catch (error) {
                // please change to transactions
                return errorResponse(res, "failed to complete Transfer please try again")
            }

            return successRes(res, "success", "successfully completed transfer", 200)
        } catch (error) {
            log({ level: "debug", message: error.message })
            return errorResponse(res, error.message || "failed to complete transaction please try again later", 500)
        }
    }
}


export const WalletCntrl = new WalletController()
