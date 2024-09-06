/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import dotenv from 'dotenv';
dotenv.config();

const { PORT, MONGOBD_USER, MONGOBD_PASSWORD, MONGOBD_DB } = process.env;

export { PORT, MONGOBD_USER, MONGOBD_PASSWORD, MONGOBD_DB };
