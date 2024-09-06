/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import Joi from 'joi';
import { getField } from '@/libs/joi.lib';

export const schemaEducation = Joi.object({
    _id: getField('_id'),
    title: Joi.string().min(0).max(255).trim().strict().required().label('Tiêu đề').messages({
        'any.required': 'Tiêu đề là bắt buộc',
        'string.min': 'Tiêu đề có ít nhất 10 ký tự',
        'string.max': 'Tiêu đề có nhiều nhất 255 ký tự',
    }),
    slug: Joi.string().min(0).max(255).trim().strict().required().label('Slug').messages({
        'any.required': 'Slug là bắt buộc',
        'string.min': 'Slug có ít nhất 3 ký tự',
        'string.max': 'Slug có nhiều nhất 255 ký tự',
    }),
    content: Joi.string().trim().strict().required().label('Nội dung').messages({
        'any.required': 'Nội dung là bắt buộc',
        'string.min': 'Nội dung có ít nhất 3 ký tự',
        'string.max': 'Nội dung có nhiều nhất 255 ký tự',
    }),
    isPublic: Joi.boolean().required().label('Public').messages({
        'any.required': 'Public là bắt buộc',
        'string.min': 'Public có ít nhất 3 ký tự',
        'string.max': 'Public có nhiều nhất 255 ký tự',
    }),
    authorId: Joi.string(),
});