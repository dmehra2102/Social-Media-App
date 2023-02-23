import { UploadImageInterface } from "../interfaces/upload.interface";
import { Document, model, Schema, Types } from "mongoose";


const UploadSchema = new Schema({
    public_id : {type : String, required : true},
    signature : {type: String, required : true},
    url : {type: String, required : true},
    user_id : {type : Types.ObjectId, required : true},
    resource_type : {type : String, required:true}
},{
    timestamps : true,
    versionKey : false
})


export const ImageModel = model<UploadImageInterface & Document>('imgae', UploadSchema);
