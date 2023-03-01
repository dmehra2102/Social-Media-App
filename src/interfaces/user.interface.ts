import { Types } from 'mongoose';

export interface RegisteredUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    isAdmin : boolean;
    createdAt: string | Date;
}
