/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Document } from 'mongoose';
import type { ResponseFormat } from '@/types';

const consoleType = {
    log: (t: string): void => console.log(t),
    warn: (t: string): void => console.warn(t),
    error: (t: string): void => console.error(t),
    table: (t: string): void => console.table(t),
};

// Export wrapper

/**
 *
 * @param error
 */
export const log = (error: string | { text: string; type?: keyof typeof consoleType } | string[]) => {
    if (typeof error === 'string') consoleType.log(error);
    else if (Array.isArray(error)) {
        console.group('log:::');
        error.forEach((item) => consoleType.log(item));
        console.groupEnd();
    } else {
        const { text, type = 'log' } = error;
        consoleType[type](text);
    }
};

/**
 *
 * @param time: number
 * @returns Date
 */
export const convertTime = (time: string | number) => {
    if (!['string', 'number'].includes(typeof time)) {
        return '--/--';
    }
    if (typeof time === 'string') {
        const _flag = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(time);
        return _flag ? new Date(time) : '--/--';
    }
    return new Date(time);
};

/**
 *
 * @param val
 * @returns
 */
export interface ConvertReturn<R> {
    status: boolean;
    statusCode: number;
    message: string;
    errors: string[];
    data: R | R[] | null;
}
export const convertReturn = <T extends Document>(val: ResponseFormat<T>): ConvertReturn<T> => {
    const { status = false, message = '', errors = [], data = null, statusCode = -1 } = val;

    const _statusCode: number = ((code) => {
        if (code > -1) return code;
        return status ? 200 : 404;
    })(statusCode);

    return {
        status,
        message,
        errors,
        data,
        statusCode: _statusCode as number,
    };
};
