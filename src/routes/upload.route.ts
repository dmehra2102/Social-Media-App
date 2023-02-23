import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import UploadController from '../controllers/upload.controller';

class UploadRoute {
    public path = '/image';
    public router = Router();
    public uploadController = new UploadController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/upload`, ensureAuthenticated, this.uploadController.uploadImage);

        this.router.get(`${this.path}/allImages`, ensureAuthenticated, this.uploadController.getAllImages);
    }
}

export default UploadRoute;
