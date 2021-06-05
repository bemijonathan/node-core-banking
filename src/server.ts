import { isCelebrateError } from 'celebrate';
import express, { Request, Response } from 'express';
import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk'

if (process.env.NODE_ENV) {
    winston.add(new Loggly({
        token: process.env.log_token!,
        subdomain: process.env.log_subdomain!,
        tags: ["Winston-NodeJS"],
        json: true
    }));
}

const app = express()

app.use((error: any, _req: Request, res: Response, next: any) => {
    if (isCelebrateError(error)) {
        // return F.clientError(res, error.details.get('body')?.message);
    }
    // F.serverError(res)
    next()
});


export default app