import { Request, Response } from "express";
import { getConnection, getManager, getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { WalletService } from "../services/wallets";
import { errorResponse, successRes } from "../utils/response";

const UserRepository = () => getRepository(User)

class UserController {

    private walletService = new WalletService();


    private userRepo() {
        return getRepository(User)
    }
    createUser = async (req: Request, res: Response) => {
        try {
            const { email, firstName, lastName, external_id } = req.body

            let user = await this.userRepo().findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user) {
                return errorResponse(res, "user already Exist", 409)
            }
            user = await this.userRepo().save(req.body)
            console.log(user)
            this.walletService.createWallet(user!.id).then()

            return successRes(res, user, "successfully created user", 201)
        } catch (error) {
            console.log(error)
            return errorResponse(res, "server Error", 500)
        }
    }

    getUserDetails = async (req: Request, res: Response) => {
        try {
            const { id, email } = req.params;
            let user
            if (id) {
                user = await this.userRepo().findOne(id)
            } else {
                user = await this.userRepo().findOne({
                    where: {
                        email
                    }
                })
            }
            if (!user) {
                return errorResponse(res, "record not found", 404)
            }
            return successRes(res, user)

        } catch (error) {
            console.log(error)
            return errorResponse(res, "server Error", 500)
        }
    }

    updateUserDetails = async (req: Request, res: Response) => {
        try {
            let user = await this.userRepo().findOne(req.params.id)
            if (!user) {
                return errorResponse(res, "record not found", 404)
            }

            // delete (user as User).email;
            await this.userRepo().save({
                ...user!,
                ...req.body,
                email: user.email
            })
            return successRes(res, { ...user, ...req.body })
        } catch (error) {
            return errorResponse(res, "server error", 500)
        }

    }

    deleteUserDetails = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const user = await this.userRepo().findOne(id)
            if (!user) {
                return errorResponse(res, "record not found", 404)
            }
            await this.userRepo().softDelete(user)
            return successRes(res, {})
        } catch (error) {
            console.log(error.message)
            return errorResponse(res, "server error", 500)
        }
    }
}


export const UserCntrl = new UserController()


