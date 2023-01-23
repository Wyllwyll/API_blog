import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersService } from '../services/usersService';
import { Request, Response } from 'express';


const accessTokenSecret = process.env.TOKEN_SECRET as string;

const usersService = new UsersService();


/**
 * Class permettant le contrôle des données entrantes pour les requêtes users
 * * **.login()** : Contrôle préalable au login d'un user
 * * **.register()**: Contrôle préalable au register d'un user
 */
export class UserController {

    /**
     * Contrôle préalable au login d'un user
     */
    async login(req: Request, res: Response) {

        const name = req.body.name;
        const password = req.body.password
        try {
            const user = await usersService.getUsersByName(name);
            console.log(user);
            

            if (!user) {
                res.status(404).json(
                    {
                        status: "fail",
                        message: 'identifiant incorrect',
                        data: null
                    }
                )

                return;
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (result == true) {
                    const accessToken = jwt.sign({ userId: user.id, admin: user.admin }, accessTokenSecret);
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

    /**
     * Contrôle préalable au register d'un user
     */
    register(req: Request, res: Response) {
        const name = req.body.name;
        const password = req.body.password;

        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                const data = await usersService.addUsers(name, hash);
                res.status(201).json(
                    {
                        status: "success",
                        message: "enregistrement réussi",
                        data: name
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