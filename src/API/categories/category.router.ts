/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';

import { getCategories, createCategory, deletePost } from './category.controller';

const router = express.Router();

router.get('/', getCategories);
router.post('/create', createCategory);
router.delete('/delete/:id', deletePost);

export default router;
