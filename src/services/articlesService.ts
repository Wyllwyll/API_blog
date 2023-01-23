import { client } from '../client';
import { Articles } from '../entity/articles';
import { User } from '../entity/User';
import { Tarticles } from '../types/Tarticles';

/**
 * Class permettant la gestion des requètes SQL pour les articles
 * * **.getAllArticles()** : recupère tout les articles de la BDD
 * * **.getArticlesById()** : recupère un article par son id de la BDD
 * * **.postArticles()** : ajoute un nouvel article à la BDD
 * * **.uptArticles()** : modifie un article par son id de la BDD
 * * **.delArticles()** : supprime un article de la BDD
 * * **.getArticleWithCommentary()** : recupère un article et tout ses commentaires de la BDD
 */
export class ArticlesService {

    /**
     * recupère tout les articles de la BDD 
     */
    async getAllArticles(): Promise<Articles[] | undefined> {
        const articles = Articles.find();
        console.log(articles);
        return articles;
    }

    /**
     * recupère un article par son id de la BDD
     */
    async getArticlesById(id: number): Promise<Articles | undefined> {
        const articles = await Articles.find({
            where: {
                id: id
            }
        }
        );
        console.log(articles);
        return articles[0]
    }

    /**
     * ajoute un nouvel article à la BDD
     */
    async postArticles(title: string, content: string, user: User): Promise<Articles | undefined> {

        const article = new Articles()
        article.title = title
        article.content = content
        article.user = user

        await article.save()

        return article
    }

    /**
     * supprime un article de la BDD
     */
    async delArticles(id: number): Promise<Articles | undefined> {
        const article = this.getArticlesById(id)
        ;(await article).remove()
        
        console.log(article);
        return article

    }

    /*  const data = await client.query('DELETE FROM articles WHERE id=$1 RETURNING *', [id])
            return data.rowCount; */


    /**
     * modifie un article par son id de la BDD
     */
    async uptArticles(uptTitle: string, uptContent: string, articles_id: number) {
        const data = await client.query('UPDATE articles SET title=$1, content=$2 WHERE id=$3 RETURNING *', [uptTitle, uptContent, articles_id])
        if (data.rowCount > 0) {
            return data.rows[0];
        }
        return undefined
    }

    /**
     * recupère un article et tout ses commentaires de la BDD
     */
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
