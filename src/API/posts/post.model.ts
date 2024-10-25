/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
export enum EnumStatus {
    publish = 'Publish',
    draft = 'Draft',
    pending = 'Pending',
    private = 'Private',
}

export type PostStatus = EnumStatus;
export interface Post extends Document {
    _id: typeof MongooseSchema.Types.ObjectId | null;
    title: string;
    slug: string;
    status: PostStatus;
    content: string;
    authorId: string;
    excerpt: string;
    tags: string[];
}

const schema = new Schema<Post>(
    {
        _id: { type: ObjectId, required: [false, 'Vui lòng nhập ID'] },
        title: { type: String, default: '', required: [false, 'Vui lòng nhập Title'] },
        slug: { type: String, default: '', required: [false, 'Vui lòng nhập slug'] }, // unique: false
        status: { type: String, default: EnumStatus.draft, required: [false, 'Vui lòng nhập Status'] },
        content: { type: String, default: '', required: [false, 'Vui lòng nhập content'] },
        excerpt: { type: String, default: '', required: [false, 'Vui lòng nhập excerpt'] },
        authorId: { type: String, default: '', required: [false, 'Vui lòng nhập authorId'] },
        tags: { type: [String], default: [], required: [false, 'Vui lòng nhập tags'] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<Post>('posts', schema);
