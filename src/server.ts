import UploadRoute from './routes/upload.route';
import App from './app';
import AuthRoute from './routes/auth.route';


const app = new App([new AuthRoute(), new UploadRoute()]);

app.listen();
