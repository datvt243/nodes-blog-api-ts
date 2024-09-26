/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */
import { Model, UpdateQuery } from 'mongoose';
import slug from 'slug';

import type { Response } from '@/libs/joi.lib';
import { MongooseCRUD } from '@/libs/mongoose.lib';
import { convertReturn } from '@/utils/helper';
import type { Post } from './post.model';
import { PostValidator } from './post.validation';

export class PostService extends PostValidator {
    db: any;
    model: Model<Post>;

    constructor(model: Model<Post>) {
        super();
        this.model = model;
        this.db = new MongooseCRUD<Post>(this.model);
    }

    checkDataInput(data: Post): Post {
        !data._id && (data._id = null);
        !data.isPublic && (data.isPublic = false);
        data.slug = slug(data.title as string, '-');
        return data;
    }

    isValidate(document: Post): Response<Post> {
        const isValidation = this.validate(document);
        if (!isValidation.status) {
            return {
                status: false,
                errors: isValidation.errors,
            };
        }
        return {
            status: true,
            value: isValidation.value,
        };
    }

    findAllPost = async () => {
        const result = await this.db.findDocument({ model: this.model });
        return convertReturn(result);
    };

    getDetail = async (id: string) => {
        const result = await this.db.findDocumentById(id);
        return convertReturn(result);
    };

    savePost = async (doc: Post) => {
        const result = await this.db.saveDocument(doc);
        return convertReturn(result);
    };

    updatePost = async (doc: UpdateQuery<Post>) => {
        const updated = await this.db.updateDocument(doc);
        return convertReturn(updated);
    };

    deletePost = async (id: string) => {
        const deleted = await this.db.deleteDocument(id);
        return convertReturn(deleted);
    };
}
