import { client } from "../client";
import { User } from "../entity/User";


/**
 * Class permettant la gestion des requètes SQL pour les users
 * * **.getUsersByName()** : recupère un user par son nom de la BDD
 * * **.addUsers()** : ajoute un utilisateur dans la BDD
 */
export class UsersService {

    /**
     * recupère un user par son nom de la BDD
     */
    async getUsersByName(name: string): Promise<User | undefined> {
        const user = User.findOne({
            where: {
                name: name
            }
        })
        if (user) return user;

        return undefined;
    }

    /**
     * ajoute un utilisateur dans la BDD
     */
    async addUsers(name: string, hash: string): Promise<User | undefined> {
        const user = new User()
        user.name = name
        user.password = hash

        await user.save()

        return user
    }


}