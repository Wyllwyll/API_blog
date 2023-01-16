import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { CustomRequest } from "./usersIdProperty";

const accessTokenSecret = process.env.ACCESSTOKENSECRET

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (accessTokenSecret) {
            jwt.verify(token, accessTokenSecret, (err: any, token) => {
                if (err) {
                    return res.sendStatus(403);
                }
                if (token) {
                    req.userId = parseInt((token as jwt.JwtPayload).userId);
                    next();
                }

            });

        }
    } else {
        res.sendStatus(401);
    }
};