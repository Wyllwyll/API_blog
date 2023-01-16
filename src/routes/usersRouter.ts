import express from "express";
import { UserController } from "../controllers/usersController";
require ('dotenv').config();



export const usersRouter=express.Router();

const usersController=new UserController()

usersRouter.post ('/register', (req,res)=>usersController.register(req,res));

usersRouter.post ('/login', (req,res)=>usersController.login(req,res));