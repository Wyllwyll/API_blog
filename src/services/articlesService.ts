import { client } from '../client';
import { Tarticles } from '../types/Tarticles';

export class ArticlesService {
    async getAllArticles() {
        const data = await client.query('SELECT * FROM articles');
        if (data.rowCount) {
            const listArticle: Tarticles[] = data.rows;
            return listArticle;
        }
        return undefined
    }

    async getArticlesById(id: number) {
        const data = await client.query('SELECT * FROM articles WHERE id=$1', [id])
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined
    }

    async postArticles(title: string, content: string, users_id: number) {
        const data = await client.query('INSERT INTO articles (title, content,users_id) VALUES ($1,$2,$3) returning *', [title, content, users_id])
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined
    }

    async delArticles(article_id: number) {
        const data = await client.query('DELETE FROM articles WHERE id=$1 RETURNING *', [article_id])
        if (data.rowCount > 0) {
            return data.rows[0];
        }
        return undefined
    }

    async uptArticles(uptTitle:string, uptContent:string, articles_id:number){
        const data=await client.query('UPDATE articles SET title=$1, content=$2 WHERE id=$3 RETURNING *', [uptTitle,uptContent,articles_id])
        if (data.rowCount>0){
            return data.rows[0];
        }
        return undefined
    }
    

}
