/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import Joi, { ObjectSchema } from 'joi';
import { Document } from 'mongoose';

interface SuccessResponse<T extends Document> {
    status: true;
    value: T;
}

interface ErrorResponse {
    status: false;
    errors: Record<string, string>;
}

export type Response<T extends Document> = SuccessResponse<T> | ErrorResponse;

interface SchemaProvider {
    getSchema: () => ObjectSchema;
}

export class JoiHelper {
    protected objectIdValidator = Joi.extend((joi) => ({
        type: 'objectId',
        base: joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .allow(null)
            .required(),
        messages: {
            'objectId.base': '{{#label}} must be a valid ObjectId',
        },
    }));

    protected fields: { [key: string]: (opt?: any) => Joi.Schema } = {
        _id: () => this.objectIdValidator.objectId().required(),
        stringDefault: (opt: { min?: number; max?: number; label: string }) => {
            const { min = 0, max = 255, label = 'Title' } = opt;
            return Joi.string()
                .min(min)
                .max(max)
                .trim()
                .strict()
                .required()
                .label(label)
                .messages({
                    'any.required': `${label} là bắt buộc`,
                    'string.min': `${label} có ít nhất 10 ký tự`,
                    'string.max': `${label} có nhiều nhất 255 ký tự`,
                });
        },
    };

    getFieldByKey(key: keyof typeof this.fields) {
        return this.fields[key]();
    }
}

export class JoiBase implements SchemaProvider {
    protected schema: ObjectSchema;

    constructor(schema: ObjectSchema) {
        this.schema = schema;
    }

    getSchema(): ObjectSchema {
        return this.schema;
    }
}

export class JoiValidator<T extends Document> extends JoiBase {
    constructor(schema: ObjectSchema) {
        super(schema);
    }

    validate(data: T): Response<T> {
        const _schema = this.getSchema();
        const { error, value } = _schema.validate({ ...data }, { abortEarly: false });
        if (!error) {
            return {
                status: true,
                value,
            };
        }

        return {
            status: false,
            errors: ((error) => {
                const valError = new JoiValidator(this.getSchema());
                return valError.handleError(error);
            })(error),
        };
    }

    private handleError(error: any) {
        const { details = [] } = error;
        return details.reduce((result: Record<string, string>, detail: any) => {
            const _field = detail?.path[0],
                _mess = detail.message;
            result[_field] = _mess;
            return result;
        }, {});
    }
}
