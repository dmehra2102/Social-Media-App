import UploadRoute from './routes/upload.route';
import App from './app';
import AuthRoute from './routes/auth.route';
import ProductRoute from './routes/product.route';
import ReviewRoute from './routes/review.route';


const app = new App([new AuthRoute(), new UploadRoute(), new ProductRoute(), new ReviewRoute()]);

app.listen();
