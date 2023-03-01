import ReviewController from "../controllers/review.controller";
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

class ReviewRoute {
    public path = '/review';
    public router = Router();
    public reviewController= new ReviewController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}/`, ensureAuthenticated, this.reviewController);
        
        this.router.post(`${this.path}/add/:productId`, ensureAuthenticated, this.reviewController.addReview);

    }
}

export default ReviewRoute;