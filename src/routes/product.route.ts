import ProductController from "../controllers/product.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { checkIsAdmin } from "../middleware/isAdmin";

class ProductRoute {
    public path = '/product';
    public router = Router();
    public productController = new ProductController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/add`,ensureAuthenticated, this.productController.addProduct);

        this.router.patch(`${this.path}/update/:productId`,ensureAuthenticated, this.productController.updateProduct);

        this.router.delete(`${this.path}/delete/:productId`,ensureAuthenticated, this.productController.deleteProduct);

        this.router.get(`${this.path}/allProducts`, ensureAuthenticated,checkIsAdmin , this.productController.getAllProduct);
        
        this.router.get(`${this.path}/:productId`,ensureAuthenticated, this.productController.getSingleProduct);
        
    }
}

export default ProductRoute;