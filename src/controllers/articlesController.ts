import { ArticlesService } from "../services/articlesService";
import { Request, Response } from "express";
import { CustomRequest } from "../middleware/usersIdProperty";

const articlesService = new ArticlesService()


export class ArticlesController {

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

    async updateArticle(req: CustomRequest, res: Response) {
        const articleId = parseInt(req.params.id)
        const uptContent = req.body.content
        const uptTitle = req.body.title
        const userId = req.userId
        const admin=req.body.admin

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

    async getArticleWithCommentary(req: CustomRequest, res: Response) {
        const articleId = (req.params.id);
        console.log("test1",articleId);
        
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