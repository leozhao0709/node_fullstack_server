import { Request, Response, NextFunction } from 'express';

export const creditsRequire = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).send();
    } else {
        if (req.user.credits > 0) {
            next();
        } else {
            return res.status(401).send({ err: 'require more credits!' });
        }
    }
};