/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */
import { Model, UpdateQuery } from 'mongoose';
// import slug from 'slug';
import slug from 'slug';
import type { Response } from '@/libs/joi.lib';
import { MongooseCRUD } from '@/libs/mongoose.lib';
import { convertReturn } from '@/utils/helper';
import type { ConvertReturn } from '@/utils/helper';
import type { Category } from './category.model';
import { CategoryValidator } from './category.validation';

// interface CategoryServiceInterface {
//     findAllCategory: () => Promise<ConvertReturn<Category>>;
// }
interface BaseService {
    findAllCategory: () => Promise<ConvertReturn<Category>>;
    saveCategory: (post: Category) => Promise<ConvertReturn<Category>>;
    updateCategory: (post: UpdateQuery<Category>) => Promise<ConvertReturn<Category>>;
    deleteCategory: (id: string) => Promise<{ status: boolean; message: string }>;
}
export class CategoryService extends CategoryValidator implements BaseService {
    db: MongooseCRUD<Category>;
    model: Model<Category>;

    constructor(model: Model<Category>) {
        super();
        this.model = model;
        this.db = new MongooseCRUD<Category>(this.model);
    }
    checkDataInput(data: Category): Category {
        if (!data._id) data._id = null;
        data.slug = slug(data.name as string, '-');
        return data;
    }

    isValidate(document: Category): Response<Category> {
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

    findAllCategory = async () => {
        const result = await this.db.findDocument({});
        return convertReturn<Category>(result);
    };

    saveCategory = async (doc: Category) => {
        const result = await this.db.saveDocument(doc);
        result.message = result.status ? 'Thêm mới thành công' : 'Thêm mới thất bại';
        return convertReturn<Category>(result);
    };

    updateCategory = async (doc: UpdateQuery<Category>) => {
        const updated = await this.db.updateDocument(doc);
        return convertReturn<Category>(updated);
    };

    deleteCategory = async (id: string): Promise<{ status: boolean; message: string }> => {
        const { status, message = '' } = await this.db.deleteDocument(id);
        return { status, message };
    };
}
