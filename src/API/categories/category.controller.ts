/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Request, Response } from 'express';
// import type { Category } from './category.model';
import MODEL, { Category } from './category.model';
import { CategoryService } from './category.service';

/**
 * Lấy tất cả post
 * @returns Post[]
 */
export const getCategories = async (req: Request, res: Response) => {
    const service = new CategoryService(MODEL);

    const { status, message, errors, data } = await service.findAllCategory();
    res.status(status ? 200 : 401).json({
        status,
        message,
        errors,
        data,
    });
};

export const createCategory = async (req: Request, res: Response) => {
    const { body } = req;

    const service = new CategoryService(MODEL);

    // Kiểm tra data đầu vào (từ req)
    let document: Category = service.checkDataInput({ ...body });

    // Kiểm tra dữ liệu (base on Joi)
    const isValidation = service.validate(document);
    if (!isValidation.status) {
        return res.status(400).json({
            status: false,
            message: 'Kiểm tra dữ liệu thất bại, dữ liệu lỗi',
            errors: isValidation.errors,
            data: null,
        });
    }
    document = { ...isValidation.value } as Category;

    // 2. call Model, thao tác data base
    const { status, message = '', errors, data } = await service.saveCategory(document);

    res.status(status ? 200 : 400).json({
        status,
        message,
        errors,
        data,
    });
};

/**
 * Delete Post
 * @returns
 */
export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ status: false, message: 'Không tìm thấy _id' });

    const service = new CategoryService(MODEL);
    const { status, message } = await service.deleteCategory(id);

    res.status(status ? 200 : 400).json({
        status,
        message,
        errors: [],
        data: null,
    });
};
