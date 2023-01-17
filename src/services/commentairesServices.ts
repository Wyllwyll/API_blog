
import { client } from "../client";



export class CommentairesServices {
    async getAllCommentary() {
        const data = await client.query('SELECT * FROM commentary')
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


    async addCommentary(users_id: number, article_id: number, title: string, content: string) {
        const data = await client.query('INSERT INTO commentary (user_id,article_id,title,content) VALUES ($1,$2,$3,$4) RETURNING 9', [users_id, article_id, title, content]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }


    async deleteCommentary(id:number){
        const data = await client.query('DELETE FROM commentary WHERE id=$1 RETURNING *', [id])
        return data.rowCount;
    }


    async updateCommentary (uptTitle:string, uptContent:string,commentary_id:number ){
        const data=await client.query('UPDATE commentary SET title =$1, content =$2, uptdate=NOW() WHERE id=$3',[uptTitle,uptContent,commentary_id])
        if (data.rowCount>0){
            return data.rows[0]
        }
        return undefined
    }
}