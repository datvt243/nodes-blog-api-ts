/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { JoiHelper, JoiValidator } from '@/libs/joi.lib';
import Joi, { ObjectSchema } from 'joi';
import { User } from './user.model';

export class PostValidator {
    schema: ObjectSchema;
    defineJoiHelper = new JoiHelper();

    constructor() {
        this.schema = Joi.object({
            _id: this.defineJoiHelper.getFieldByKey('_id'),
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
    }

    validate(data: User) {
        const joi = new JoiValidator<User>(this.schema);
        return joi.validate(data);
    }
}
