import { ArticlesService } from "../services/articlesService";
import { Request, Response } from "express";
import { CustomRequest } from "../middleware/usersIdProperty";

const articlesService = new ArticlesService()

/**
 * Class permettant le contrôle des données entrantes pour les requête articles
 * * **.getArticles()** : Contrôle préalable à la récupération de tous les articles 
 * * **.getArticleId()** : Contrôle préalable à la récupération d'un article grâce à son id
 * * **.postArticle()** : Contrôle préalable à l'ajout d'un nouvel article
 * * **.updtateArticle()** : Contrôle préalable à la modification d'un article
 * * **.deleteArticle()** : Contrôle préalable à la suppression d'un article
 * * **.getArticleWithCommentary()** : contrôle préalable à la récupération des commentaires PAR articles ID
 */
export class ArticlesController {

    /**
     * Contrôle préalable à la récupération de tous les articles
     */
    async getArticles(req: Request, res: Response) {
        try {
            const data = await articlesService.getAllArticles();
            res.status(200).json(
                {
                    status: "success",
                    message: "Liste des articles",
                    data: data
                }
            )
        }
        catch (err: any) {
            res.status(500).json(
                {
                    status: "Fail",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack)
        }
    }

    /**
     * Contrôle préalable à la récupération d'un article grâce à son id
     */
    async getArticleId(req: Request, res: Response) {

        const articleId = parseInt(req.params.id);
        if (!Number.isNaN(articleId)) {
            try {
                const data = await articlesService.getArticlesById(articleId)
                if (data) {
                    res.status(200).json(
                        {
                            status: "success",
                            data: data
                        }
                    )
                }
                else {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "l'ID ne correspond à aucun article"
                        }
                    )
                }
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "Erreur serveur"
                    }
                )
                console.log(err.stack);
            }
        }
        else {
            res.status(404).json(
                {
                    status: "fail",
                    message: "numéro d'ID nécessaire"
                }
            )
        }
    }

    /**
    *Contrôle préalable à l'ajout d'un nouvel article
     */
    async postArticle(req: CustomRequest, res: Response) {
        const content = req.body.content
        const user_id = req.userId
        const title = req.body.title

        if (title && content && user_id) {
            try {
                const data = await articlesService.postArticles(title, content, user_id)
                res.status(201).json(
                    {
                        status: "success",
                        message: "Article publié avec Succés!",
                        data: data
                    }
                )
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "Erreur serveur"
                    }
                )
                console.log(err.stack);

            }
        }
        else {
            res.status(400).json(
                {
                    status: "fail",
                    message: "Titre, message ou Id utilisateur obligatoire"
                }
            )
        }
    }

    /**
    *Contrôle préalable à la suppression d'un article
     */
    async deleteArticle(req: CustomRequest, res: Response) {
        const articleId = parseInt(req.params.id);
        const userId = req.body.userId
        const admin = req.body.admin

        if (!Number.isNaN(articleId)) {
            try {
                const articleData = await articlesService.getArticlesById(articleId)
                if (articleData === 0) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "ID ne correspond à aucun article"
                        }
                    )
                }
                else if (userId !== articleData.user_id && !admin) {
                    res.status(400).json(
                        {
                            status: "fail",
                            message: "action non autorisée"
                        }
                    )
                }

                else {
                    const data = await articlesService.delArticles(articleId)
                    if (data! > 0) {
                        res.status(200).json(
                            {
                                status: "success",
                                message: "article supprimé"
                            }
                        )
                    }
                }

            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "Erreur serveur"
                    }
                )
                console.log(err.stack);
            }
        }
        else {
            res.status(404).json(
                {
                    status: "fail",
                    message: "ID nécessaire"
                }
            )
        }
    }

    /**
     * 
    *Contrôle préalable à la modification d'un article
     */
    async updateArticle(req: CustomRequest, res: Response) {
        const articleId = parseInt(req.params.id)
        const uptContent = req.body.content
        const uptTitle = req.body.title
        const userId = req.userId
        const admin = req.body.admin

        if (!Number.isNaN(articleId)) {
            if (uptContent && uptTitle !== undefined) {
                try {
                    const articleData = await articlesService.uptArticles(uptTitle, uptContent, articleId)
                    if (!articleData) {
                        res.status(404).json(
                            {
                                status: "fail",
                                message: "nécessite un Nombre valable en guise d'ID"
                            }
                        )
                    }
                    else if (userId !== articleData.user_id && !admin) {
                        res.status(404).json(
                            {
                                status: "fail",
                                message: "modification non-autorisée"
                            }
                        )
                    }
                    else {
                        const data = await articlesService.uptArticles(uptTitle, uptContent, articleId)
                        if (data) {
                            res.status(201).json(
                                {
                                    status: "success",
                                    message: "données modifiées",
                                    data: data
                                }
                            )
                        }
                    }
                }
                catch (err: any) {
                    res.status(500).json(
                        {
                            status: "fail",
                            message: "erreur serveur"
                        }
                    )
                }
            }
            else {
                res.status(400).json(
                    {
                        status: "fail",
                        message: "valeurs manquantes"
                    }
                )
            }
        }
    }

    /**
    * contrôle préalable à la récupération des commentaires PAR articles ID
     */
    async getArticleWithCommentary(req: CustomRequest, res: Response) {
        const articleId = (req.params.id);
        if (!Number.isNaN(articleId)) {
            try {
                const data = await articlesService.getArticleWithCommentary(articleId)
                if (data) {
                    res.status(200).json(
                        {
                            status: "success",
                            data: data
                        }
                    )
                }
                else {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "l'ID ne correspond à aucun article"
                        }
                    )
                }
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "Erreur serveur"
                    }
                )
                console.log(err.stack);
            }
        }
        else {
            res.status(404).json(
                {
                    status: "fail",
                    message: "numéro d'ID nécessaire"
                }
            )
        }
    }
}