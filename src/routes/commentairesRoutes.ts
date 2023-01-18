import express from "express";
import { CommentaryController } from "../controllers/commentairesController"
import { authenticateJWT } from "../middleware/auth";

/**
 * const permettant le routage des requètes concernant un commentaire
 * * **.gets('/')** : route de récuperation de tout les commentaires 
 * * **.post('/')** : route de création de commentaire
 * * **.delete('/:id)** : route de suppression d'un commentaire
 * * **.put('/:id)** :  route de modification d'un commentaire
 */
export const commentaryRouter = express.Router()
const commentaryController = new CommentaryController;

/** route de récuperation de tout les commentaires   */
commentaryRouter.get('/', authenticateJWT, commentaryController.getAllCommentary);

/** route de création de commentaire */
commentaryRouter.post('/', authenticateJWT, commentaryController.postCommentary);

/** route de suppression d'un commentaire */
commentaryRouter.delete('/:id', authenticateJWT, commentaryController.deleteCommentary);

/** route de modification d'un commentaire */
commentaryRouter.put('/', authenticateJWT, commentaryController.updateCommentary)