import  express  from "express";
import { ArticlesController } from "../controllers/articlesController";
import { authenticateJWT } from "../middleware/auth";

export const articlesRouter= express.Router();

const articlesController=new ArticlesController();


articlesRouter.get('/',authenticateJWT,(req,res)=>articlesController.getArticles(req,res));

articlesRouter.get('/id',authenticateJWT,(req,res)=>articlesController.GetArticlesId(req,res));

articlesRouter.post('/',authenticateJWT,(req,res)=>articlesController.postArticles(req,res));

articlesRouter.delete('/id',authenticateJWT,(req,res)=>articlesController.delArticles(req,res));

articlesRouter.put('/id',authenticateJWT,(req,res)=>articlesController.uptArticles(req,res));