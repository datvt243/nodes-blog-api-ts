/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
    {
        _id: { type: ObjectId, required: [false, 'Vui lòng nhập ID'] },
        title: { type: String, default: '', required: [false, 'Vui lòng nhập Title'] },
        slug: { type: String, default: '', required: [false, 'Vui lòng nhập slug'] }, // unique: false
        isPublic: { type: Boolean, default: '', required: [false, 'Vui lòng nhập isPublic'] },
        content: { type: String, default: '', required: [false, 'Vui lòng nhập content'] },
        authorId: { type: String, default: '', required: [false, 'Vui lòng nhập authorId'] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('posts', schema);
