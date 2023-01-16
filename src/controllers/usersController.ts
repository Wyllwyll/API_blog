import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersService } from '../services/usersService';
import { Request, Response } from 'express';


const accessTokenSecret = process.env.ACCESSTOKENSECRET as string;

const usersService = new UsersService();

export class UserController {

    async login(req: Request, res: Response) {
        const name = req.body.users_name;
        const password = req.body.password
        try {
            const user = await usersService.getUsersByName(name);
            if (user) {
                bcrypt.compare(password, user.password, async function (err, result) {
                    if (result == true) {
                        const accessToken = jwt.sign({ userId: user.id }, accessTokenSecret);
                        res.status(200).json(
                            {
                                status: 'OK',
                                data: accessToken,
                                message: 'vous etes bien connecté'
                            }
                        )
                    }
                    else {
                        res.status(403).json(
                            {
                                status: 'fail',
                                message: 'mot de passe incorrect',
                                data: null
                            }
                        )
                    }
                })
            }
            else {
                res.status(404).json(
                    {
                        status: "fail",
                        message: 'identifiant incorrect',
                        data: null
                    }
                )
            }
        }
        catch (err: any) {
            res.status(500).json(
                {
                    status: "fail",
                    message: 'Erreur serveur'
                }
            )
            console.log(err.stack);

        }
    }


    register(req: Request, res: Response) {
        const name = req.body.user_name;
        const password = req.body.password;

        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                const data = await usersService.addUsers(name, hash);
                res.status(201).json(
                    {
                        status: "success",
                        message: "enregistrement réussi",
                        data: data
                    }
                )
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: 'fail',
                        message: 'Erreur serveur'
                    }
                )
                console.log(err.stack);

            }
        })
    }

}