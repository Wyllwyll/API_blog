
import { QueryResult } from "pg";
import { Tcommentary } from "~/types/Tcommentary";
import { client } from "../client";

/**
 * Class permettant la gestion des requètes SQL pour les commentaires
 * * **.getAllCommentary()** : recupère tout les commentaires de la BDD
 * * **.getCommentaryById()** : recupère un commentaires par son id de la BDD
 * * **.addCommentary()** : ajoute un nouveau commentaires à la BDD
 * * **.updateCommentary()** : modifie un article par son id de la BDD
 * * **.deleteCommentary()** : supprime un commentaires de la BDD
 * * **.getCommentaryByArticleId()** : recupère les commentaires par ID d'article de la BDD
 */

export class CommentairesServices {

    /**
     * recupère tout les commentaires de la BDD
     */
    async getAllCommentary(): Promise<Tcommentary[] | undefined> {
        const data: QueryResult<Tcommentary> = await client.query('SELECT * FROM commentary')
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }

    /**
     * recupère les commentaires par ID d'article de la BDD
     */
    async getCommentaryByArticleId(id: number): Promise<Tcommentary[] | undefined> {
        const data = await client.query('SELECT * FROM commentary WHERE article_id=$1', [id])
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }

    /**
     *recupère un commentaires par son id de la BDD  
     * */
    async getCommentaryById(id: number): Promise<Tcommentary | undefined> {
        const data: QueryResult<Tcommentary> = await client.query('SELECT * FROM commentary WHERE id=$1', [id])
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    /**
     * ajoute un nouveau commentaires à la BDD
     */
    async addCommentary(userId: number, articleId: number, title: string, content: string): Promise<Tcommentary | undefined> {
        const data = await client.query('INSERT INTO commentary (users_id,article_id,title,content) VALUES ($1,$2,$3,$4) RETURNING *', [userId, articleId, title, content]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    /**
     * supprime un commentaires de la BDD
     */
    async deleteCommentary(id: number): Promise<number> {
        const data = await client.query('DELETE FROM commentary WHERE id=$1 RETURNING *', [id])
        return data.rowCount;
    }

    /**
     * modifie un article par son id de la BDD
     */
    async updateCommentary(uptTitle: string, uptContent: string, commentary_id: number): Promise<Tcommentary | undefined> {
        const data = await client.query('UPDATE commentary SET title =$1, content =$2 WHERE id=$3 RETURNING *', [uptTitle, uptContent, commentary_id])

        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }
}