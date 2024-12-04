/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description: ...
 */

import mongoose from 'mongoose';
import { log } from '@/utils/helper';
import { MONGOBD_USER, MONGOBD_PASSWORD, MONGOBD_DB, NODE_ENV } from '@/environment';

export const connectMongo = (callback = () => {}) => {
    const URL_SERVER = `mongodb+srv://${MONGOBD_USER}:${MONGOBD_PASSWORD}@davidapi.jhhu4ml.mongodb.net/${MONGOBD_DB}?retryWrites=true&w=majority&appName=davidAPI`;
    const URL_LOCAL = `mongodb://localhost:27017/${MONGOBD_DB}`;
    const URL = NODE_ENV === 'development' ? URL_LOCAL : URL_SERVER;

    mongoose
        .connect(URL)
        .then(() => {
            log(`/** -------------------------------\n * MongoDB Connected! ${NODE_ENV}`);
            callback();
        })
        .catch((err) => {
            log({ text: err, type: 'error' });
        });
};
