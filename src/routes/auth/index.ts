/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';
import AuthRouter from '@/API/auth/auth.router';

const router = express.Router();

router.use('/auth', AuthRouter);

router.all('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'API Not Found',
        errors: [],
        data: null,
    });
});

export default router;
