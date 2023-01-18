import express from "express";
import { UserController } from "../controllers/usersController";
require('dotenv').config();


/**
 * const permettant le routage des requètes concernant un user
 * * **.post('/register')** : route d'enregistrement d'un user
 * * **.post('/login')** : route de log d'un user
 */
export const usersRouter = express.Router();
const usersController = new UserController()

/** route d'enregistrement d'un user */
usersRouter.post('/register', (req, res) => usersController.register(req, res));

/** route de log d'un user */
usersRouter.post('/login', (req, res) => usersController.login(req, res));