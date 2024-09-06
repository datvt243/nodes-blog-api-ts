/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).render('index');
});

router.get('/blog', (req: Request, res: Response) => {
    res.status(200).render('blog');
});

router.get('/contact', (req: Request, res: Response) => {
    res.status(200).render('contact');
});

router.get('/*', (req: Request, res: Response) => {
    res.status(404).render('404');
});

export default router;
