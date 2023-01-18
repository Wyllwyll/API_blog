import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { CustomRequest } from "./usersIdProperty";

const accessTokenSecret = process.env.TOKEN_SECRET

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
                    req.body.userId = parseInt((token as jwt.JwtPayload).userId);
                    req.body.admin=(token as jwt.JwtPayload).admin;
                    next();
                    
                }

            });

        }
    } else {
        res.sendStatus(401);
    }
};