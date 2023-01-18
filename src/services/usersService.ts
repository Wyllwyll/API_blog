import { client } from "../client";


/**
 * Class permettant la gestion des requètes SQL pour les users
 * * **.getUsersByName()** : recupère un user par son nom de la BDD
 * * **.addUsers()** : ajoute un utilisateur dans la BDD
 */
export class UsersService {

    /**
     * recupère un user par son nom de la BDD
     */
    async getUsersByName(name: string) {

        const data = await client.query('SELECT * FROM users WHERE name=$1', [name])
        console.log((data.rows));

        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined
    }

    /**
     * ajoute un utilisateur dans la BDD
     */
    async addUsers(name: string, hash: string) {
        const data = await client.query('INSERT INTO users (name, password) VALUES ($1,$2)RETURNING *', [name, hash])
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined
    }


}