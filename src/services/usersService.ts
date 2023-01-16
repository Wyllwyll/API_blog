import { client } from "../client";

export class UsersService {
    async getUsersByName(name: string) {
        const data = await client.query('SELECT * FROM users WHERE user_name=$1', [name])
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined
    }

    async addUsers(name: string, hash: string) {
        const data = await client.query('INSERT INTO users (name, password) VALUES ($1,$2)RETURNING *', [name, hash])
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined
    }


}