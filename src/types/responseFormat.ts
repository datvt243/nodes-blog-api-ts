/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Document } from 'mongoose';

export interface ResponseFormat<T extends Document> {
    status?: boolean;
    statusCode?: number;
    message?: string;
    errors?: string[];
    data?: T | T[] | null;
}
