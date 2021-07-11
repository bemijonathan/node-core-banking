import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { WalletCntrl } from "../controllers/wallets";

const route = Router()



/**
 * get all wallet and the curresponding user
 */
route.route('/').get(
    WalletCntrl.getAll
)
    .post(celebrate({
        body: Joi.object({
            user_id: Joi.number().required(),
        })
    }), WalletCntrl.createWallet)

route.route('/transaction')
    .post(celebrate({
        body: Joi.object({
            type: Joi.valid("withdraw", "deposit"),
            amount: Joi.number().positive(),
            description: Joi.string().optional(),
            user_id: Joi.number().required()
        })
    }), WalletCntrl.withDrawFromWallet)


route.route('/transfer')
    .post(celebrate({
        body: Joi.object({
            destination_wallet_no: Joi.string().required(),
            from_destination: Joi.string().required(),
            description: Joi.string().optional().allow(""),
            amount:  Joi.number().required().positive()
        })
    }), WalletCntrl.transfer)

export default route