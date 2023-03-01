import { Request, Response } from 'express';
import { ProductModel } from '../models/product.model';

class ProductController {
    public addProduct = async (req: Request, res: Response) => {
        try {
            const { image_url, title, actual_price, discount, description, extra_info, images, tags, reviews } = req.body;

            const new_Product = await ProductModel.create({ image_url, title, actual_price, discount, description, extra_info, images, tags, reviews });
            return res.status(201).json(new_Product);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    };

    public deleteProduct = async (req: Request, res: Response) => {
        try {
            await ProductModel.findByIdAndDelete(req.params.productId);

            return res.status(200).send(`Product with ID ${req.params.productId} has been deleted.`);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    };

    public updateProduct = async (req: Request, res: Response) => {
        try {

            const product = await ProductModel.findByIdAndUpdate(req.params.productId, {$set : req.body},{new:true});

            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    };

    public getSingleProduct = async (req: Request, res: Response) => {
        try {
            const product = await ProductModel.findById(req.params.productId).populate({path: 'reviews', populate : {path : 'user_id',select : 'name email'}});

            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    };

    public getAllProduct = async (req: Request, res: Response) => {
        try {
            const all_Products = await ProductModel.find();

            return res.status(200).json(all_Products);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    };
}

export default ProductController;
