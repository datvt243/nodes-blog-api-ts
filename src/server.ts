/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express, { Express } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

// use alias "@"
import 'module-alias/register';
import './_alias'; // tuỳ chỉnh alias cho dist và src

import { errorsMiddleware } from '@/middlewares';
import { log } from '@/utils/helper';
import { PORT } from '@/environment';
import router from '@/routes';

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

    /**
     * use middleware
     */
    app.use(errorsMiddleware);

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
        log(`/** -------------------------------\n * Server is listening on ${isProduction ? 'Server::' : 'Localhost::'}${PORT}`);
    });
};

/**
 * run app
 */
import { connectMongo } from './database/connect';
connectMongo(() => {
    runApp();
});
