import { Types } from 'mongoose';

export interface UploadImageInterface {
    _id: Types.ObjectId;
    public_id : string;
    signature : string;
    url : string;
    user_id : Types.ObjectId;
    resource_type : string;
}
