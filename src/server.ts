/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

// use alias "@"
import 'module-alias/register';
// tuỳ chỉnh alias cho dist và src
import './_alias';

import { errorsMiddleware } from '@/middlewares';
import { PORT } from '@/environment';
import router from '@/routes';

/* global.log = (mess: string | Record<string, string>): void => {
    console.log(mess);
}; */

const runApp = () => {
    /**
     * init App
     */
    const app: Express = express();

    /**
     * user session
     */
    app.use(
        session({
            secret: 'session_secret_key',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true },
        }),
    );

    /**
     * user CORD
     */
    app.use(
        cors({
            origin: '*',
            optionsSuccessStatus: 200,
        }),
    );

    /**
     * use BodyParser
     */
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    /**
     * static folder
     */
    app.use(express.static(path.join(__dirname, 'public')));

    /**
     * use Routes
     */
    app.use(router);
    // Ví dụ một route có thể ném lỗi
    /* app.get('/', (req, res) => {
        throw new Error('Something bad happened!');
    }); */

    /**
     * use middleware
     */
    app.use(errorsMiddleware);
    /* app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error('niceeeeee ');
        console.error(err.stack);
        res.status(500).json({
            status: false,
            message: 'Something broke! error Middleware::' + err.message,
        });
    }); */

    /**
     * use template-engine
     */
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    /**
     * LISTER
     */
    app.listen(PORT, () => {
        const isProduction = process.env.NODE_ENV === 'production';
        console.log(
            `/** -------------------------------\n * Server is listening on ${isProduction ? 'Server::' : 'Localhost::'}${PORT}`,
        );
    });
};

/**
 * run app
 */
import { connectMongo } from './database/connect';
connectMongo(() => {
    runApp();
});
