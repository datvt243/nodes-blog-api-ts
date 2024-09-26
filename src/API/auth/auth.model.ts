/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import type { User } from '@/API/users/user.model';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema<User>(
    {
        _id: { type: ObjectId, required: [false, 'Vui lòng nhập ID'] },
        email: { type: String, default: '', required: [false, 'Vui lòng nhập Title'] },
        password: { type: String, default: '', required: [false, 'Vui lòng nhập slug'] },
        status: { type: Boolean, default: false, required: [false, 'Vui lòng nhập slug'] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<User>('users', schema);
