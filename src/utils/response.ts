import { Response } from "express";

export const successRes = (res: Response, data: any, message = 'success', status = 200) => {
    return res.status(status).json({
        data,
        message
    })
}


export const errorResponse = (res: Response, message = 'unsuccessful', status = 400) => {
    return res.status(status).json({
        message
    })
}


