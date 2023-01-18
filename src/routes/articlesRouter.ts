import express from "express";
import { ArticlesController } from "../controllers/articlesController";
import { authenticateJWT } from "../middleware/auth";

export const articlesRouter = express.Router();

const articlesController = new ArticlesController();


articlesRouter.get('/', authenticateJWT, articlesController.getArticles);

articlesRouter.get('/:id', authenticateJWT, articlesController.getArticleId);

articlesRouter.post('/', authenticateJWT, articlesController.postArticle);

articlesRouter.delete('/:id', authenticateJWT, articlesController.deleteArticle);

articlesRouter.put('/:id', authenticateJWT, articlesController.updateArticle);

articlesRouter.get('/comments/:id', authenticateJWT,articlesController.getArticleWithCommentary);