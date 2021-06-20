import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { UserCntrl } from '../controllers/users'
const userRoute = Router();

userRoute.route('/')
    .post(celebrate({
        body: Joi.object({
            firstName: Joi.string().optional().allow(""),
            lastName: Joi.string().optional().allow(""),
            email: Joi.string().email().required(),
            external_id: Joi.any().required().required(),
            photo: Joi.string(),
            document: Joi.string().optional().allow(""),
            occupation: Joi.string(),
            phone: Joi.string().required(),
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
        params: Joi.object({
            id: Joi.alternatives(Joi.string(), Joi.number()).optional(),
        }),
        body: Joi.object({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional().allow(""),
            photo: Joi.string().optional().uri(),
            document: Joi.string().optional().allow(""),
            occupation: Joi.string().optional().allow(""),
            phone: Joi.string().optional().allow(""),
        })
    }),

        UserCntrl.updateUserDetails
    )
    .delete(celebrate({
        params: Joi.object({
            id: Joi.alternatives(Joi.string(), Joi.number()).optional(),
        })
    }),
        UserCntrl.deleteUserDetails
    )


export default userRoute