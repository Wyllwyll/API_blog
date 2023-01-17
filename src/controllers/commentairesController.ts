import { Request, Response } from "express";
import { CommentairesServices } from "../services/commentairesServices";
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
        const title: string = req.body.title
        const content: string = req.body.content
        const userId: number = req.body.userId
        const articleId: number = req.body.articleId

        if (title && content && userId && articleId) {
            try {
                const data = await commentaryService.addCommentary(userId, articleId, title, content)
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
        if (commentaryId) {
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
            console.log("test3");

            res.status(404).json(
                {
                    stats: "fail",
                    message: "ID de commentaire nécessaire"
                }
            )
        }
    }
    async updateCommentary(req: Request, res: Response) {
        const commentaryId: number = parseInt(req.body.id)
        const uptContent: string = req.body.content
        const uptTitle: string = req.body.title
        const userId: number = req.body.userId

        if (!commentaryId || !uptTitle || !uptContent) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "valeurs manquantes"
                }
            )

            return;
        }


        console.log("test1", commentaryId, uptTitle, uptContent);

        try {
            // recupere le comment avec l'id commentaryId
            const checkComment = await commentaryService.getCommentaryById(commentaryId);
            console.log(checkComment);
            
            // verifier que ce comment.user_id === req.body.userId
            if (checkComment && checkComment.users_id !== userId) {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "modification non-autorisée"
                    }
                )

                return;
            }
            // tout va bien on update le comment
            const comment = await commentaryService.updateCommentary(uptTitle, uptContent, commentaryId)
            if (comment) {
                res.status(201).json(
                    {
                        status: "success",
                        message: "commentaire modifié",
                        data: comment
                    }
                )
            }
        }
        catch (err: any) {
            console.log(err);
            
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
        }
    }
}





