import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { UserCntrl } from '../controllers/users'
const userRoute = Router();

userRoute.route('/')
    .post(celebrate({
        body: Joi.object({
            firstName: Joi.string().optional(),
            email: Joi.string().email().required(),
            external_id: Joi.any().required()
        })
    }),
        UserCntrl.createUser
    )