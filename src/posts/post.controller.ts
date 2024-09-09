/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Request, Response } from 'express';
import MODEL from './post.model';
import type { Post } from './post.model';
import { PostService } from './post.service';

/**
 * Lấy tất cả post
 * @returns Post[]
 */
export const getAllBlog = async (req: Request, res: Response) => {
    const service = new PostService(MODEL);
    const { status, message, errors, data } = await service.findAllPost();
    res.status(status ? 200 : 401).json({
        status,
        message,
        errors,
        data,
    });
};

/**
 * Tạo mới Post
 * @returns Post
 */
export const createNewPost = async (req: Request, res: Response) => {
    const { body } = req;

    const service = new PostService(MODEL);

    // Kiểm tra data đầu vào (từ req)
    let document: Post = service.checkDataInput({ ...body });

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
    document = { ...isValidation.value } as Post;

    // 2. call Model, thao tác data base
    const { status, message, errors, data } = await service.savePost(document);

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

    const service = new PostService(MODEL);
    const { status, statusCode, message, errors, data } = await service.deletePost(id);

    res.status(statusCode || 200).json({
        status,
        message,
        errors,
        data,
    });
};

/**
 * update Post
 */
export const updatePost = async (req: Request, res: Response) => {
    const { body } = req;
    if (!body._id) return res.status(400).json({ status: false, message: 'Không tìm thấy _id' });

    const service = new PostService(MODEL);

    // Kiểm tra data đầu vào (từ req)
    let document: Post = service.checkDataInput({ ...body });

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
    document = { ...isValidation.value } as Post;

    const { status, statusCode, message, errors, data } = await service.updatePost(document);

    res.status(statusCode || 200).json({
        status,
        message,
        errors,
        data,
    });
};
