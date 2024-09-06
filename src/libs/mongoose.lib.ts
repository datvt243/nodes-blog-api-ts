import { Error } from 'mongoose';
import { Document, ResponseFormat } from '@/types';

const log = console.log.bind(console);
const initRes: ResponseFormat = {
    status: false,
    message: '',
    errors: [],
    data: null,
};

const handleError = (error: any) => {
    let _message = '',
        _errors: string[] = [];

    if (error instanceof Error.ValidationError) {
        const { errors } = error;
        log({ errors });
        for (const [key, value] of Object.entries(errors)) {
            log(1, { key, value: Object.keys(value) });
        }
    } else {
        _message = error.message;
    }

    return {
        errors: _errors,
        message: _message,
    };
};

const handleTryCatch = async (callback = async (): Promise<ResponseFormat> => initRes): Promise<ResponseFormat> => {
    let _result: ResponseFormat = { status: false, message: '', errors: [], data: null };

    try {
        _result = await callback();
    } catch (error) {
        const { errors, message } = handleError(error);
        _result = {
            ..._result,
            status: false,
            message,
            errors,
        };
    }

    return {
        ..._result,
    };
};

export const findDocument = async (options: { model: any }) => {
    return await handleTryCatch(async () => {
        const { model: MODEL } = options;
        const _data = await MODEL.find({ isPublic: true });
        return {
            status: true,
            errors: [],
            message: '',
            data: _data,
        };
    });
};

export const SaveDocument = async (document: Document, options: { model: any }) => {
    return await handleTryCatch(async () => {
        const { model: MODEL } = options;

        // 1. Validation
        await MODEL.validate({ ...document });

        // 2. Save
        const _record = await MODEL.create({ _id: null, ...document });

        return {
            status: true,
            errors: [],
            message: 'Tạo mới Post thành công',
            data: _record,
        };
    });
};
