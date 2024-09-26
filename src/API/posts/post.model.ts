/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface Post extends Document {
    _id: typeof MongooseSchema.Types.ObjectId | null;
    title: string;
    slug: string;
    isPublic: boolean;
    content: string;
    authorId: string;
    /* createdAt?: number;
    updatedAt?: number;
    deletedAt?: number; */
}

const schema = new Schema<Post>(
    {
        _id: { type: ObjectId, required: [false, 'Vui lòng nhập ID'] },
        title: { type: String, default: '', required: [false, 'Vui lòng nhập Title'] },
        slug: { type: String, default: '', required: [false, 'Vui lòng nhập slug'] }, // unique: false
        isPublic: { type: Boolean, default: false, required: [false, 'Vui lòng nhập isPublic'] },
        content: { type: String, default: '', required: [false, 'Vui lòng nhập content'] },
        authorId: { type: String, default: '', required: [false, 'Vui lòng nhập authorId'] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<Post>('posts', schema);
