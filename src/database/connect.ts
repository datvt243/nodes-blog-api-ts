/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description: ...
 */

import mongoose from 'mongoose';
import { log } from '@/utils/helper';
import { MONGOBD_USER, MONGOBD_PASSWORD, MONGOBD_DB } from '@/environment';

export const connectMongo = (callback = () => {}) => {
    mongoose
        .connect(
            `mongodb+srv://${MONGOBD_USER}:${MONGOBD_PASSWORD}@davidapi.jhhu4ml.mongodb.net/${MONGOBD_DB}?retryWrites=true&w=majority&appName=davidAPI`,
        )
        .then(() => {
            log(`/** -------------------------------\n * MongoDB Connected!`);
            callback();
        })
        .catch((err) => {
            log({ text: err, type: 'error' });
        });
};
