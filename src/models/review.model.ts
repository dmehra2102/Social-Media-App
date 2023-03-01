import { ReviewInterface } from "../interfaces/review.interface";
import { Document, model, Schema, Types } from "mongoose";


const ReviewSchema = new Schema({
    text : {type:String, required : true},
    ratings : {type : Number, required: true},
    user_id : {type: Schema.Types.ObjectId, ref : 'user'}
},{
    timestamps : true,
    versionKey : false
})


export const ReviewModel = model<ReviewInterface & Document>('review', ReviewSchema);