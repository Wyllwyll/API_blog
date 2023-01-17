
import { QueryResult } from "pg";
import { Tcommentary } from "~/types/Tcommentary";
import { client } from "../client";



export class CommentairesServices {
    async getAllCommentary(): Promise<Tcommentary[] | undefined> {
        const data: QueryResult<Tcommentary> = await client.query('SELECT * FROM commentary')
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }


    async getCommentaryByArticleId(id: number) {
        const data = await client.query('SELECT * FROM commentary WHERE article_id=$1', [id])
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }

    async getCommentaryById(id: number): Promise<Tcommentary | undefined> {
        const data: QueryResult<Tcommentary> = await client.query('SELECT * FROM commentary WHERE id=$1', [id])
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }


    async addCommentary(userId: number, articleId: number, title: string, content: string) {
        const data = await client.query('INSERT INTO commentary (users_id,article_id,title,content) VALUES ($1,$2,$3,$4) RETURNING *', [userId, articleId, title, content]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }


    async deleteCommentary(id: number) {
        const data = await client.query('DELETE FROM commentary WHERE id=$1 RETURNING *', [id])
        return data.rowCount;
    }


    async updateCommentary(uptTitle: string, uptContent: string, commentary_id: number) {
        console.log('TEST');

        const data = await client.query('UPDATE commentary SET title =$1, content =$2 WHERE id=$3 RETURNING *', [uptTitle, uptContent, commentary_id])

        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }
}