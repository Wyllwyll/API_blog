import express from "express";
import { CommentaryController } from "../controllers/commentairesController"
import { authenticateJWT } from "../middleware/auth";

export const commentaryRouter=express.Router()

const commentaryController= new CommentaryController;

commentaryRouter.get ('/', authenticateJWT, commentaryController.getAllCommentary);

commentaryRouter.post('/',authenticateJWT, commentaryController.postCommentary);

commentaryRouter.delete('/:id',authenticateJWT,commentaryController.deleteCommentary);

commentaryRouter.put('/', authenticateJWT, commentaryController.updateCommentary)