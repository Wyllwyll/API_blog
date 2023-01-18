import { Request, Response } from "express";
import { CustomRequest } from "~/middleware/usersIdProperty";
import { Tcommentary } from "~/types/Tcommentary";
import { CommentairesServices } from "../services/commentairesServices";
const commentaryService = new CommentairesServices


/**
 * Class permettant le contrôle des données entrantes pour les requêtes commentaires
 * * **.getAllCommentary()** : Contrôle préalable à la récupération de tous les commentaires 
 * * **.postCommentary()** : Contrôle préalable à l'ajout d'un nouveeau commentaire
 * * **.updateCommentary** : Contrôle préalable à la modification d'un commentaire
 * * **.deleteCommentary()** : Contrôle préalable à la suppression d'un commentaire
 */
export class CommentaryController {
    /**
     *Contrôle préalable à la récupération de tous les commentaires
     */
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

    /**
    *Contrôle préalable à l'ajout d'un nouveeau commentaire
     */
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

    /**
     * Contrôle préalable à la suppression d'un commentaire
     */
    async deleteCommentary(req: Request, res: Response) {
        const commentaryId = parseInt(req.params.id);
        const userId = req.body.user_id
        const admin = req.body.admin

        if (commentaryId) {
            try {
                const commentaryData = await commentaryService.getCommentaryById(commentaryId)
                if (!commentaryData) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "ID ne correspond à aucun commentaire"
                        }
                    )

                }
                else if (userId !== commentaryData?.user_id && !admin) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "modification non-autorisée"
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
                    message: "ID de commentaire nécessaire"
                }
            )
        }
    }

    /**
     *Contrôle préalable à la modification d'un commentaire
     */
    async updateCommentary(req: Request, res: Response) {
        const commentaryId: number = parseInt(req.body.id)
        const uptContent: string = req.body.content
        const uptTitle: string = req.body.title
        const userId: number = req.body.userId
        const admin = req.body.admin

        if (!commentaryId || !uptTitle || !uptContent) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "valeurs manquantes"
                }
            )

            return;
        }

        try {
            // recupere le comment avec l'id commentaryId
            const checkComment = await commentaryService.getCommentaryById(commentaryId);

            // verifier que ce comment.user_id === req.body.userId
            if (checkComment && checkComment.user_id !== userId && !admin) {
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





