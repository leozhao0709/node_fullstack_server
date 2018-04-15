import { User } from '../models/User';
import { NextFunction, Request, Response } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        next();
    } else {
        const token = req.header('x-auth')!;
        User.findByToken(token)
            .then(user => {
                if (!user) {
                    throw 'user not found';
                }

                req.user = user;
                req.token = token;

                next();
            })
            .catch(_ => {
                res.status(401).send();
            });
    }

};
