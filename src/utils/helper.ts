/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import type { ResponseFormat } from '@/types';

const _log = console.log.bind(console);
const consoleType = {
    warn: (t: string): void => console.warn(t),
    error: (t: string): void => console.error(t),
    table: (t: string): void => console.table(t),
};

export const log = (error: string | { text: string; type: keyof typeof consoleType } | string[]) => {
    if (typeof error === 'string') _log(error);
    else if (Array.isArray(error)) {
        console.group('log:::');
        error.forEach((item) => _log(item));
        console.groupEnd();
    } else {
        const { text, type } = error;
        consoleType[type](text);
    }
};

export const convertTime = (time: string | number) => {
    if (typeof time === 'string') {
        return new Date(time);
    }
    return new Date(time);
};

export const convertReturn = (val: ResponseFormat): ResponseFormat => {
    const { status = false, message = '', errors = [], data = null } = val;
    return {
        status,
        message,
        errors,
        data,
    };
};
