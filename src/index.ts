// imports
import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { articlesRouter } from './routes/articlesRouter';
import { usersRouter } from './routes/usersRouter';
import { commentaryRouter } from './routes/commentairesRoutes';
import { } from "reflect-metadata"
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';


declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload // permet d'inserer un user a req pour l'id
        }
    }
}


// Init environment variables (see .env.local file if it doesn't exist go to README.md file)
dotenv.config({ path: '.env' });


// Express server creation

AppDataSource.initialize().then(async () => {
    const app = express();
    const port = process.env.PORT || 8000;

    // for parsing application/json
    app.use(express.json());


    // Add headers before the routes are defined
    app.use(function (req, res, next) {

        res.setHeader('authorization', '');
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        // Pass to next layer of middleware
        next();
    });

    /************************************************
       * Add the route here
       */
    app.use('/api/articles', articlesRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/commentary', commentaryRouter);

    app.all('*', function (req, res) {
        res.status(404).json(
            {
                status: "FAIL",
                message: "Nécessite un nombre valable en tant qu'Id"
            }
        );
    }
    );

    // Bind express server on port 8080
    app.listen(port, () => {
        console.log(
            `Express server has started on port ${port}. Open http://localhost:${port} to see results`
        );
    });

}).catch(error => console.log(error))