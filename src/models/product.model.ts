import { ProductInterface } from "../interfaces/product.interface";
import { Document, model, Schema, Types } from "mongoose";


const ProductSchema = new Schema({
    image_url : {type : String,required : true},
    title : {type : String,required : true},
    actual_price : {type : String,required : true},
    discount : {type : Number,required : false},
    description : {type : String,required : true},
    extra_info : [String],
    images : [String],
    tags : [String],
    reviews : [{type: Schema.Types.ObjectId,ref : 'review'}]
},{
    timestamps : true,
    versionKey : false
})


export const ProductModel = model<ProductInterface & Document>('product', ProductSchema);
