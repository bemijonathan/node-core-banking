import { isCelebrateError } from 'celebrate';
import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk'
import userRoute from './routes/users';
import { errorResponse } from './utils/response';
import bodyParser from 'body-parser';




if (process.env.NODE_ENV === 'production') {
    winston.add(new Loggly({
        token: process.env.log_token!,
        subdomain: process.env.log_subdomain!,
        tags: ["Winston-NodeJS"],
        json: true
    }));
}

const app = express()

app.use(bodyParser({ limit: 500000, type: 'json' }))

app.use('/user', userRoute)

app.use('*', (req, res) => {
    return errorResponse(res, "route not found", 404)
})

app.use((error: any, _req: Request, res: Response, next: any) => {
    if (isCelebrateError(error)) {
        const errorMessage = error.details.get('body') || error.details.get('query') || error.details.get('params')
        const message = errorMessage!.message.replace(/"/g, "")
        return errorResponse(res, message);
    }
    // F.serverError(res)
    next()
});


export default app