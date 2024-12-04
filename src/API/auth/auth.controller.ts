/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Request, Response } from 'express';
import { AuthValidator } from './auth.validation';

interface LoginAuth {
    email: string
    password: string
}
export const handleLogin = (req: Request, res: Response) => {

    const body: LoginAuth = req.body;

    const authValidator = new AuthValidator();

    res.status(200).json({
        status: true,
        message: 'Login successfully',
    });
};

export const handleOut = (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'Logout successfully',
    });
};

export const handleRefreshToken = (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: '',
    });
};
