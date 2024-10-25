/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';
import PostRouter from '@/API/posts/post.router';
import CategoryRouter from '@/API/categories/category.router';

const router = express.Router();

router.use('/post', PostRouter);
router.use('/categories', CategoryRouter);

router.all('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'API Not Found',
        errors: [],
        data: null,
    });
});

export default router;
