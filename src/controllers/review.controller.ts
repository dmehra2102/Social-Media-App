import { Response } from "express";
import { ReviewModel } from "../models/review.model";
import { AuthRequest } from "../interfaces/auth.interface";
import { ProductModel } from "../models/product.model";

class ReviewController {
    public addReview = async (req:AuthRequest,res:Response)=>{
        const {_id} = req.user;
        const {text,ratings} = req.body;

        const  user_review = await ReviewModel.create({text,ratings,user_id:_id});
        
        await ProductModel.findByIdAndUpdate(req.params.productId,{$push : {reviews :user_review._id}});
        return res.status(200).json(user_review);
    }
}

export default ReviewController;