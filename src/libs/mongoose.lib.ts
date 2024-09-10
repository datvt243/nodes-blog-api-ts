/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import mongoose, { Error, Document, Model, UpdateQuery } from 'mongoose';

export class MongooseErrorValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MongooseErrorValidationError';
        Error.captureStackTrace(this, this.constructor);
    }
}

interface MongooseBaseProvider {
    isValidObjectId: (id: string) => boolean;
    handleError: (error: any) => { errors: string[]; message: string };
}
class MongooseBase implements MongooseBaseProvider {
    constructor() {}

    isValidObjectId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    handleError(error: any): { errors: string[]; message: string } {
        let _message = '',
            _errors: string[] = [];

        if (error instanceof Error.ValidationError) {
            const { errors } = error;
            for (const [key, value] of Object.entries(errors)) {
                _errors.push(`${key}::: ${value}`);
            }
        } else {
            _message = error.message;
        }

        return {
            errors: _errors,
            message: _message,
        };
    }
}

interface TryCatchReturn<R> {
    status: boolean;
    message?: string;
    errors?: string[];
    data?: R | R[] | null;
}
export class MongooseCRUD<T extends Document> extends MongooseBase {
    model: Model<T>;
    defineReturn = { status: false, message: 'Has errors', errors: [], data: null };

    constructor(model: Model<T>) {
        super();
        this.model = model;
    }

    handleTryCatch = async <R>(fn: () => Promise<TryCatchReturn<R>>): Promise<TryCatchReturn<R>> => {
        let _res: TryCatchReturn<R> = this.defineReturn;
        try {
            _res = await fn();
        } catch (error) {
            const { errors, message } = this.handleError(error);
            _res = {
                status: false,
                errors,
                message,
                data: null,
            };
        }
        return _res;
    };

    findDocument = async (options: { select?: Record<string, any> }) => {
        return await this.handleTryCatch(async () => {
            const _select = ((select) => {
                if (!select || !Object.keys(select)) {
                    return { isPublic: true };
                }
                return { isPublic: true, ...(options?.select || {}) };
            })(options?.select || {});

            const _find = await this.model.find(_select).exec();
            return { status: true, data: _find ? _find : null };
        });
    };

    saveDocument = async (document: T) => {
        return await this.handleTryCatch(async () => {
            // 1. Validation cấp database
            await this.model.validate({ ...document });

            // 2. Save
            const _doc = await this.model.create(document);

            return {
                status: true,
                data: _doc,
            };
        });
    };

    updateDocument = async (document: UpdateQuery<T>) => {
        const { _id = '' } = document;

        const validObjectId = this.isValidObjectId(_id as string);
        if (!validObjectId) return false;

        // 1. Kiểm tra document tồn tại
        const _find = await this.model.findById(document._id).exec();
        if (!_find) return { status: false, message: 'ID không tồn tại' };

        return await this.handleTryCatch(async () => {
            // 1. Validation cấp database
            await this.model.validate(document);

            // 2. Update
            const updated = await this.model.findByIdAndUpdate({ _id }, document, { new: true, runValidators: true }).exec();

            const flag = !!updated;
            return {
                status: flag ? true : false,
                statusCode: flag ? 200 : 500,
                message: flag ? 'Update thành công' : 'Update thất bại',
                data: updated,
            };
        });
    };

    deleteDocument = async (id: string) => {
        // 1. Kiểm tra định dạng Id
        const validObjectId = this.isValidObjectId(id);
        if (!validObjectId) return false;

        // 1. Kiểm tra document tồn tại
        const _find = await this.model.findById(id).exec();
        if (!_find) return { status: false, message: 'ID không tồn tại' };

        // 2. Xác thực quyền
        // Code here

        // 3. Kiểm tra ràng buộc với các collection khác
        // Code here

        return this.handleTryCatch(async () => {
            // 4. Xoá
            const _record = await this.model.deleteOne({ _id: id }).exec();

            // 5. Ghi nhận log
            // Code here

            return {
                status: !!_record.deletedCount,
                message: !!_record.deletedCount ? 'Xoá thành công' : 'Xoá thất bại',
            };
        });
    };
}
