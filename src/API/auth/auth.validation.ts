/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { JoiHelper, JoiValidator } from '@/libs/joi.lib';
import Joi, { ObjectSchema } from 'joi';
import type { User } from '@/API/users/user.model';

export class PostValidator {
    schema: ObjectSchema;
    defineJoiHelper = new JoiHelper();

    constructor() {
        this.schema = Joi.object({
            _id: this.defineJoiHelper.getFieldByKey('_id'),
            email: Joi.string().trim().strict().required().label('Email').messages({
                'any.required': 'Email là bắt buộc',
            }),
            password: Joi.string().min(5).max(255).trim().strict().required().label('Password').messages({
                'any.required': 'Password là bắt buộc',
                'string.min': 'Password có ít nhất 5 ký tự',
                'string.max': 'Password có nhiều nhất 255 ký tự',
            }),
            status: Joi.boolean().required().label('Trạng thái').messages({
                'any.required': 'Trạng thái là bắt buộc',
                'string.min': 'Trạng thái có ít nhất 3 ký tự',
                'string.max': 'Trạng thái có nhiều nhất 255 ký tự',
            }),
        });
    }

    validate(data: User) {
        const joi = new JoiValidator<User>(this.schema);
        return joi.validate(data);
    }
}
