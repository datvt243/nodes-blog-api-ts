/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';
import PostRouter from '@/posts/post.router';

const router = express.Router();

router.use('/post', PostRouter);

router.all('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'API Not Found',
        errors: [],
        data: null,
    });
});

export default router;
