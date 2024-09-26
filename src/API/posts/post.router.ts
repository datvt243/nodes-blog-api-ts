/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';

import { getAllBlog, createNewPost, deletePost, updatePost, getPostDetail } from './post.controller';

const router = express.Router();

router.get('/', getAllBlog);
router.post('/create', createNewPost);
router.patch('/update', updatePost);
router.delete('/delete/:id', deletePost);
router.get('/detail/:id', getPostDetail);

export default router;
