/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Request, Response, NextFunction } from 'express';
import { log } from '@/utils/helper';

/* interface CustomError extends Error {
    status?: number;
} */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorsMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    log('***** WARNING!!! Ops! we got a problem');

    let _error: string = 'Lỗi không xác định',
        _code: number = 500;

    if (error instanceof ReferenceError) {
        _error = error.message;
        _code = 404;
    }

    res.status(_code || 400).json({
        status: false,
        message: `${_error}`,
        stack: process.env.NODE_ENV === 'development' ? error.stack : '',
    });
};
