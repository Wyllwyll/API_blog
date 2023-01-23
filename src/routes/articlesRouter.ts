import express from "express";
import { ArticlesController } from "../controllers/articlesController";
import { authenticateJWT } from "../middleware/auth";


/**
 * const permettant le routage des requètes concernant un article
 * * **.gets('/')** : route de récuperation de tout les articles  
 * * **.get('/:id)** : route de récuperation des articles par l'ID
 * * **.post('/')** : route de création d'article
 * * **.delete('/:id)** : route de suppression d'article
 * * **.put('/:id)** :  route de modification d'article
 * * **.get('/comments/:id)** : route de récuperation d'un article ET de tout ses commentaires
 */
export const articlesRouter = express.Router();

const articlesController = new ArticlesController();

/** 
 * route de récuperation de tout les articles */
articlesRouter.get('/', authenticateJWT, articlesController.getArticles);

/** route de récuperation des articles par l'ID */
articlesRouter.get('/:id', authenticateJWT, articlesController.getArticleId);

/** route de création d'article */
articlesRouter.post('/', authenticateJWT, articlesController.postArticle);

/** route de suppression d'article */
articlesRouter.delete('/:id', authenticateJWT, articlesController.deleteArticle);

/** route de modification d'article */
articlesRouter.put('/:id', authenticateJWT, articlesController.updateArticle);

/** route de récuperation d'un article ET de tout ses commentaires */
articlesRouter.get('/comments/:id', authenticateJWT, articlesController.getArticleWithCommentary);