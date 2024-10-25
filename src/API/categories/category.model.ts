/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface Category extends Document {
    _id: typeof mongoose.Schema.Types.ObjectId | null;
    name: string;
    slug: string;
    description?: string;
    parent?: typeof mongoose.Schema.Types.ObjectId;
}

const schema = new Schema<Category>(
    {
        _id: { type: ObjectId, required: [false, 'Vui lòng nhập ID'] },
        name: { type: String, default: '', required: [false, 'Vui lòng nhập Name'] },
        slug: { type: String, default: '', required: [false, 'Vui lòng nhập Slug'] },
        description: { type: String, default: '', required: [false, 'Vui lòng nhập Description'] },
        parent: { type: ObjectId, required: false },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<Category>('categories', schema);
