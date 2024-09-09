/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';

import { getAllBlog, createNewPost, deletePost, updatePost } from './post.controller';

const router = express.Router();

router.get('/', getAllBlog);
router.post('/create', createNewPost);
router.patch('/update', updatePost);
router.delete('/delete/:id', deletePost);

export default router;
