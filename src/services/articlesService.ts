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

    async delArticles(id: number) {
        const data = await client.query('DELETE FROM articles WHERE id=$1 RETURNING *', [id])
        return data.rowCount;
    }

    async uptArticles(uptTitle: string, uptContent: string, articles_id: number) {
        const data = await client.query('UPDATE articles SET title=$1, content=$2 WHERE id=$3 RETURNING *', [uptTitle, uptContent, articles_id])
        if (data.rowCount > 0) {
            return data.rows[0];
        }
        return undefined
    }

    async getArticleWithCommentary(articleId: string) {
        const askedArticle = await client.query(
            'SELECT articles.title, articles.content,name, commentary.content AS content2 FROM articles JOIN commentary ON articles.id = commentary.article_id JOIN users ON users.id = commentary.users_id WHERE articles.id = $1',
            [articleId]
        );

        if (askedArticle.rowCount > 0) {
            const dataArticle = {
                titre: askedArticle.rows[0].titre,
                content: askedArticle.rows[0].content,
            };

            const dataComments = askedArticle.rows.map((item) => {
                return {
                    name: item.name,
                    content: item.content2,
                };
            });
            return {
                article: dataArticle,
                comments: dataComments,
            };
        }

        return undefined;
    }
}
