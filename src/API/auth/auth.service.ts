/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import { Model } from 'mongoose';
import { MongooseCRUD } from '@/libs/mongoose.lib';

import { AuthValidator } from './auth.validation';
import type { User } from '@/API/users/user.model';

export class AuthService extends AuthValidator {
    db: MongooseCRUD<User>;
    model: Model<User>;

    constructor(model: Model<User>) {
        super();
        this.model = model;
        this.db = new MongooseCRUD<User>(this.model);
    }

    checkEmailExits = async (email: string) => {
        const find = await this.model.findOne({ email });
        return !!find;
    }
}
