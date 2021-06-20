import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { errorResponse, successRes } from "../utils/response";



class UserController {
    private UserRepository = getRepository(User)
    async createUser(req: Request, res: Response) {
        try {
            const { email, firstName, lastName, external_id } = req.body
            // let user = { email, firstName, lastName, external_id }
            const user = await this.UserRepository.create(req.body)
            /**
             * create wallet for user
             */
            return successRes(res, user, "successfully created user", 201)
        } catch (error) {
            return errorResponse(res, "server Error", 500)
        }
    }

    async getUserDetails(req: Request, res: Response) {
        try {
            const { id, email } = req.params;
            let user
            if (id) {
                user = await this.UserRepository.findOne({
                    where: {
                        id,
                        // org : id 
                    }
                })
            } else {
                user = await this.UserRepository.findOne({
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
            return errorResponse(res, "server Error", 500)
        }
    }

    async updateUserDetails(req: Request, res: Response) {
        try {
            let user = await this.UserRepository.findOne(req.params.id)
            if (!user) {
                return errorResponse(res, "record not found", 404)
            }
            user = { ...user, ...req.body }
            await this.UserRepository.save(user!)
            return successRes(res, user)
        } catch (error) {
            return errorResponse(res, "server error", 500)
        }

    }

    async deleteUserDetails(req: Request, res: Response) {
        try {
            const {id} = req.params
            const user = await this.UserRepository.findOne(id)
            if(!user){
                return errorResponse(res,"record not found", 404)
            }
            await this.UserRepository.remove(user)
            return successRes(res, {})
        } catch (error) {
            return errorResponse(res, "server error", 500)
        }
    }
}


export const UserCntrl = new UserController()


