/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import Joi from 'joi';
import { Document } from '@/types';

// Type cho lỗi của Joi
interface JoiErrorDetails {
    message: string;
    path: string[]; // Đường dẫn đến thuộc tính bị lỗi
    type: string; // Loại lỗi (ví dụ: "string.base", "any.required", v.v.)
    context: {
        key: string; // Tên của thuộc tính bị lỗi
        label?: string; // Nhãn của thuộc tính, nếu có
        value?: any; // Giá trị của thuộc tính
        limit?: number; // Giới hạn nếu lỗi liên quan đến giới hạn (ví dụ: số lượng phần tử tối đa)
        // Các thuộc tính khác tùy thuộc vào loại lỗi cụ thể
    };
}

// Type cho lỗi Joi bao gồm danh sách các lỗi
interface JoiError {
    details: JoiErrorDetails[];
    _object?: any; // Đối tượng dữ liệu ban đầu
    isJoi: boolean; // Để kiểm tra xem lỗi có phải từ Joi không
    name: string; // Tên của lỗi (thường là "ValidationError")
}

const objectIdValidator = Joi.extend((joi) => ({
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

const fields: { [key: string]: () => Joi.Schema } = {
    _id: () => objectIdValidator.objectId().required(),
};

export const getField = (type: keyof typeof fields) => {
    const _result = fields[`${type}`]?.() || '';
    return _result;
};

export const validate = (opt: { schema: Joi.Schema; document: Document }) => {
    //
    const { schema, document } = opt;
    const message = 'Validation has errors';

    if (!schema || !document || !Object.keys(document)) {
        return {
            isValidated: false,
            message,
        };
    }

    //

    const validOpt = { abortEarly: false }; // Báo lỗi tất cả 1 lượt
    const { error, value } = schema.validate({ ...document }, validOpt);

    if (error) return { isValidated: false, message, errors: formatValidateError(error as JoiError) };

    return {
        isValidated: true,
        value,
        message: '',
    };
};

const formatValidateError = (error: JoiError) => {
    const { details = [] } = error;

    const messages: Record<string, string> = {};

    for (const detail of details) {
        const _field = detail?.path[0],
            _mess = detail.message;

        _mess && (messages[_field] = _mess);
    }
    return messages;
};
