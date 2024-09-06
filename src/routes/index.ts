/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express, { Request, Response } from 'express';
import { ResponseFormat } from '@/types';
import routerAPI from './api/v1';
import routerPages from './pages';

const router = express.Router();

/**
 * API
 */
router.use('/api/v1', routerAPI);

/**
 * Pages
 */
router.use('/', routerPages);

router.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: false,
        message: 'Not Found',
    } as ResponseFormat);
});

/**
 * export
 */
export default router;
