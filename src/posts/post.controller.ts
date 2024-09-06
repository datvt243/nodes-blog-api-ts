/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Request, Response } from 'express';
import MODEL from './post.model';

import { findDocument, SaveDocument } from '@/libs/mongoose.lib';

export const getAllBlog = async (req: Request, res: Response) => {
    const { status, message, errors, data } = await findDocument({ model: MODEL });
    return res.status(200).json({
        status,
        message,
        errors,
        data,
    });
};

export const createNewPost = async (req: Request, res: Response) => {
    const { body } = req;

    const { status, message, errors, data } = await SaveDocument(body, { model: MODEL });

    res.status(200).json({
        status,
        message,
        errors,
        data,
    });
};
