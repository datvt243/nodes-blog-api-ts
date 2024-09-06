/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import type { Document } from './base';

export interface ResponseFormat {
    status: boolean;
    message: string;
    errors?: string[];
    data?: Document | Document[] | null;
}
