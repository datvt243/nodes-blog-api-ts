/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';

import { getAllBlog, createNewPost } from './post.controller';

const router = express.Router();

router.get('/', getAllBlog);

router.post('/create', createNewPost);

export default router;
