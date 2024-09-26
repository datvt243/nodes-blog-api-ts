/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface User extends Document {
    _id: typeof mongoose.Schema.Types.ObjectId | null;
    email: string;
    password: string;

    firstName: string;
    lastName: string;
    status: boolean;

    // optional
    gender?: boolean;
    birthday?: number;
    avatar?: string;
    address?: string;
}

const schema = new Schema<User>(
    {
        _id: { type: ObjectId, required: [false, 'Vui lòng nhập ID'] },
        email: { type: String, default: '', required: [false, 'Vui lòng nhập Title'] },
        password: { type: String, default: '', required: [false, 'Vui lòng nhập slug'] },
        status: { type: Boolean, default: false, required: [false, 'Vui lòng nhập slug'] },
        firstName: { type: String, default: '', required: [false, 'Vui lòng nhập slug'] },
        lastName: { type: String, default: '', required: [false, 'Vui lòng nhập slug'] },
        gender: { type: Boolean, default: false, required: [false, 'Vui lòng nhập isPublic'] },
        birthday: { type: Number, default: '', required: [false, 'Vui lòng nhập content'] },
        avatar: { type: String, default: '', required: [false, 'Vui lòng nhập authorId'] },
        address: { type: String, default: '', required: [false, 'Vui lòng nhập authorId'] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<User>('users', schema);
