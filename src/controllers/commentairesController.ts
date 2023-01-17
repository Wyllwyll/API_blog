import { Request, Response } from "express";
import { usersRouter } from "~/routes/usersRouter";
import { CommentairesServices } from "~/services/commentairesServices";
const commentaryService = new CommentairesServices



export class CommentaryController {

    async getAllCommentary(req: Request, res: Response) {
        try {
            const data = await commentaryService.getAllCommentary();
            res.status(200).json(
                {
                    status: "success",
                    message: "liste des commentaires",
                    data: data
                }
            )
        }
        catch (err: any) {
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack);

        }
    }

    async postCommentary(req: Request, res: Response) {
        const title = req.body.title
        const content = req.body.content
        const users_id = req.body.userId
        const article_id = req.body.articleId

        if (title && content && users_id && article_id != null) {
            try {
                const data = await commentaryService.addCommentary(title, content, users_id, article_id)
                res.status(201).json(
                    {
                        status: "success",
                        message: "commentaire publié avec succés!",
                        data: data
                    }
                )
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
                console.log(err.stack);
            }
        }
        else {
            res.status(400).json(
                {
                    status: "fail",
                    message: "titre, message, ID utilisateur ou ID article manquant"
                }
            )
        }
    }

    async deleteCommentary(req: Request, res: Response) {
        const commentaryId = parseInt(req.params.id);

        if (Number.isNaN(commentaryId)) {
            try {
                const commentaryData = await commentaryService.getCommentaryByArticleId(commentaryId)
                if (commentaryData?.length === 0) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "ID ne correspond à aucun commentaire ou ne vous appartient pas"
                        }
                    )
                }
                else {
                    const data = await commentaryService.deleteCommentary(commentaryId)
                    if (data! > 0) {
                        res.status(200).json(
                            {
                                status: "success",
                                message: "commentaire supprimé avec succés"
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
                console.log(err.stack);

            }
        }
        else {
            res.status(404).json(
                {
                    stats: "fail",
                    message: "ID dec commentaire nécessaire"
                }
            )
        }
    }
    async updateCommentary(req: Request, res: Response) {
        const commentaryId = parseInt(req.params.id)
        const uptContent = req.body.content
        const uptTitle = req.body.title
        const user_id = req.body.userId

        if (!Number.isNaN(commentaryId)) {
            if (uptTitle && uptContent != undefined) {
                try {
                    const commentaryData = await commentaryService.updateCommentary(uptTitle, uptContent, commentaryId)
                    if (!commentaryData) {
                        res.status(404).json(
                            {
                                status: "fail",
                                message: "nécessite un nombre valable en tant qu'ID"
                            }
                        )
                    }
                    else if (user_id !== commentaryData["users_id"]) {
                        res.status(404).json(
                            {
                                status: "fail",
                                message: "modification non-autorisée"
                            }
                        )
                    }
                    else {
                        const data = await commentaryService.updateCommentary(uptTitle, uptContent, commentaryId)
                        if (data) {
                            res.status(201).json(
                                {
                                    status: "success",
                                    message: "commentaire modifié",
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

