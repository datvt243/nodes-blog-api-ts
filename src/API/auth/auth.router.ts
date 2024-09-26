/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import express from 'express';

import { handleLogin, handleOut, handleRefreshToken } from './auth.controller';

const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout', handleOut);
router.post('/refresh-token', handleRefreshToken);

export default router;
