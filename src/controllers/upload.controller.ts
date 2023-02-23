import { NextFunction, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { AuthRequest } from 'interfaces/auth.interface';
import { ImageModel } from '../models/upload.model';

class UploadController {
    public uploadImage = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const file = req.files?.image;
            if (!file) throw new Error('No file uploaded');

            if (Array.isArray(file)) {
                // Handle case where file is an array of UploadedFile
                throw new Error('Multiple files uploaded');
            } else {
                cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
                    if (err) {
                        res.json({ error: true, message: err });
                    } else {
                        const { public_id, signature, url, resource_type } = result;
                        const { _id } = req.user;
                        const image = await ImageModel.create({ public_id, signature, url, resource_type, user_id: _id });
                        res.json({ error: false, message: image });
                    }
                });
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    };

    public getAllImages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const images = await ImageModel.find();
            res.status(200).json({ erroe: false, message: images });
        } catch (error) {
            res.status(401).json({ error: true, message: error.message });
        }
    };
}

export default UploadController;
