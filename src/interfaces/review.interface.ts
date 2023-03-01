import { Types } from "mongoose";

export interface ReviewInterface {
    text : string;
    ratings : number;
    user_id : Types.ObjectId;
}