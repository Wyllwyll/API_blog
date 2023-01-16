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

    async GetArticlesId(req: Request, res: Response) {
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


    async postArticles(req: CustomRequest, res: Response) {
        const content = req.body.content
        const user_id = req.userId
        const title = req.body.title

        if (title && content && user_id != null) {
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


    async delArticles(req: CustomRequest, res: Response) {
        const articleId = parseInt(req.params.id);
        const user_id = req.userId
        if (!Number.isNaN(articleId)) {
            try {
                const articleData = await articlesService.delArticles(articleId)
                if (!articleData) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "ID fournit ne correspond à aucun article"
                        }
                    )
                }
                else if (
                    user_id !== articleData['users_id']) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "Suppression non-autorisée"
                        }
                    )
                }
                else {
                    const data = await articlesService.delArticles(articleId)
                    if (data) {
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
                    statjus: "fail",
                    message: "ID nécessaire"
                }
            )
        }
    }

    async uptArticles(req: CustomRequest, res: Response) {
        const articleId = parseInt(req.params.id)
        const uptContent = req.body.content
        const uptTitle = req.body.title
        const user_id = req.userId

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
                    else if (user_id !== articleData["users_id"]) {
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
}