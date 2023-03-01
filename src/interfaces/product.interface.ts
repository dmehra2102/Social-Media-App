import { Types } from "mongoose";

export interface ProductInterface{
    image_url : string;
    title : string;
    actual_price : string;
    discount : number;
    description : string;
    extra_info : string[];
    images : string[];
    tags : string[];
    reviews :  Types.ObjectId[]; 
}