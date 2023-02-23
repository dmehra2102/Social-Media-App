import { config } from "dotenv";
import express  from "express";
import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import { connect, set } from "mongoose";
import { dbConnection } from "./database";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import passport from "passport";
import { passportConfig } from "./config/passport-config";
import { Routes } from "./interfaces/route.interface";

config();
const MongoDBSession = ConnectMongoDBSession(session);
set('strictQuery', false);

passportConfig(passport);


class App{
    public app : express.Application;
    public port : number | string;
    public store : any;

    constructor(routes: Routes[]){
        this.app = express();
        this.port = process.env.PORT;
        this.store = new MongoDBSession({uri : process.env.MONGODB_URI, collection : 'user-session'});
        this.connectToDB();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    public listen(){
        this.app.listen(this.port,()=>{
            console.log(`Listening to PORT ${this.port}`);
        })
    }

    private connectToDB(){
        connect(dbConnection.uri, dbConnection.options)
        .then(()=>{
            console.log("Connected to Database.");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    private initializeMiddlewares(){
        this.app.use(helmet());
        this.app.use(express.urlencoded({extended : true}));
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(session({
                name: 'assess-user-session',
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                store: this.store,
                cookie: {
                    sameSite: 'lax',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: false,
                    secure: false
                }
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}

export default App;