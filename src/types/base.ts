/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

export interface Document {
    /* _id: string | null; */
    [key: string]: string | number | boolean | Array<string | number>;
}

export interface RecordObject {
    [key: string]: string | number | boolean | Array<string | number>;
}
