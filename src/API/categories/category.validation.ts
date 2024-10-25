/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { JoiHelper, JoiValidator } from '@/libs/joi.lib';
import Joi, { ObjectSchema } from 'joi';
import { Category } from './category.model';

export class CategoryValidator {
    schema: ObjectSchema;
    defineJoiHelper = new JoiHelper();

    constructor() {
        this.schema = Joi.object({
            _id: this.defineJoiHelper.getFieldByKey('_id'),
            name: Joi.string().min(0).max(255).trim().strict().required().label('Tên loại').messages({
                'any.required': 'Tên loại là bắt buộc',
                'string.min': 'Tên loại có ít nhất 10 ký tự',
                'string.max': 'Tên loại có nhiều nhất 255 ký tự',
            }),
            slug: Joi.string().min(0).max(255).trim().strict().required().label('Slug').messages({
                'any.required': 'Slug là bắt buộc',
                'string.min': 'Slug có ít nhất 3 ký tự',
                'string.max': 'Slug có nhiều nhất 255 ký tự',
            }),
            description: Joi.string().label('Mô tả').empty().messages({
                'any.required': 'Mô tả là bắt buộc',
                'string.min': 'Mô tả có ít nhất 3 ký tự',
                'string.max': 'Mô tả có nhiều nhất 255 ký tự',
            }),

            parent: Joi.string(),
        });
    }

    validate(data: Category) {
        const joi = new JoiValidator<Category>(this.schema);
        return joi.validate(data);
    }
}
