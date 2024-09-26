/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { JoiHelper, JoiValidator } from '@/libs/joi.lib';
import Joi, { ObjectSchema } from 'joi';
import { Post } from './post.model';

export class PostValidator {
    schema: ObjectSchema;
    defineJoiHelper = new JoiHelper();

    constructor() {
        this.schema = Joi.object({
            _id: this.defineJoiHelper.getFieldByKey('_id'),
            firstName: Joi.string().min(0).max(255).trim().strict().required().label('Họ').messages({
                'any.required': 'Họ là bắt buộc',
                'string.min': 'Họ có ít nhất 10 ký tự',
                'string.max': 'Họ có nhiều nhất 255 ký tự',
            }),
            lastName: Joi.string().min(0).max(50).trim().strict().required().label('Tên').messages({
                'any.required': 'Tên là bắt buộc',
                'string.min': 'Tên có ít nhất 3 ký tự',
                'string.max': 'Tên có nhiều nhất 255 ký tự',
            }),

            status: Joi.boolean().required().label('Trạng thái').messages({
                'any.required': 'Trạng thái là bắt buộc',
            }),
            gender: Joi.boolean().label('Giới tính').messages({}),
            birthday: Joi.number().label('Ngày sinh').messages({}),
            avatar: Joi.string().label('Avatar').messages({}),
            address: Joi.string().label('Địa chỉ').messages({}),
        });
    }

    validate(data: Post) {
        const joi = new JoiValidator<Post>(this.schema);
        return joi.validate(data);
    }
}
