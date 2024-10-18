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
import type { ConvertReturn } from '@/utils/helper';
import type { Post } from './post.model';
import { EnumStatus } from './post.model';
import { PostValidator } from './post.validation';

// interface PostServiceInterface {
//     findAllPost: () => Promise<ConvertReturn<Post>>;
// }
interface BaseService {
    findAllPost: () => Promise<ConvertReturn<Post>>;
    findPerPage: (opts: { page: number; perPage?: number }) => Promise<ConvertReturn<Post>>;
    getDetail: (id: string) => Promise<ConvertReturn<Post>>;
    savePost: (post: Post) => Promise<ConvertReturn<Post>>;
    updatePost: (post: UpdateQuery<Post>) => Promise<ConvertReturn<Post>>;
    deletePost: (id: string) => Promise<{ status: boolean; message: string }>;
}
export class PostService extends PostValidator implements BaseService {
    db: MongooseCRUD<Post>;
    model: Model<Post>;

    constructor(model: Model<Post>) {
        super();
        this.model = model;
        this.db = new MongooseCRUD<Post>(this.model);
    }

    checkDataInput(data: Post): Post {
        if (!data._id) data._id = null;
        if (!data.status) data.status = EnumStatus.draft;
        if (!data.tags) data.tags = [];
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
        const result = await this.db.findDocument({});
        return convertReturn<Post>(result);
    };

    findPerPage = async (opts: { page: number; perPage?: number }) => {
        const { page, perPage = 20 } = opts;
        const result = await this.db.findDocumentByPage({ page, perPage });
        return convertReturn<Post>(result);
    };

    getDetail = async (id: string) => {
        const result = await this.db.findDocumentById(id);
        return convertReturn<Post>(result);
    };

    savePost = async (doc: Post) => {
        const result = await this.db.saveDocument(doc);
        return convertReturn<Post>(result);
    };

    updatePost = async (doc: UpdateQuery<Post>) => {
        const updated = await this.db.updateDocument(doc);
        return convertReturn<Post>(updated);
    };

    deletePost = async (id: string): Promise<{ status: boolean; message: string }> => {
        const { status, message = '' } = await this.db.deleteDocument(id);
        return { status, message };
    };
}
