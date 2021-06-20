import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { UserCntrl } from '../controllers/users'
const userRoute = Router();

userRoute.route('/')
    .post(celebrate({
        body: Joi.object({
            firstName: Joi.string().optional(),
            lastNamed: Joi.string().optional(),
            email: Joi.string().email().required(),
            external_id: Joi.any().required(),
            photo: Joi.string(),
            document: Joi.string(),
            occupation: Joi.string(),
            phone: Joi.string(),
        })
    }),
        UserCntrl.createUser
    )

userRoute.route('/:id')
    .get(celebrate({
        params: Joi.object({
            id: Joi.alternatives(Joi.string(), Joi.number()).optional(),
            email: Joi.string().email().trim().lowercase().optional()
        })
    }),
        UserCntrl.getUserDetails
    )
    .patch(celebrate({
        body: Joi.object({
            firstName: Joi.string().optional(),
            photo: Joi.string(),
            document: Joi.string(),
            occupation: Joi.string(),
            phone: Joi.string(),
        })
    }),

        UserCntrl.updateUserDetails
    )
    .delete(celebrate({
        params: Joi.object({
            id: Joi.alternatives(Joi.string(), Joi.number()).optional(),
            email: Joi.string().email().trim().lowercase().optional()
        })
    }),
        UserCntrl.deleteUserDetails
    )


