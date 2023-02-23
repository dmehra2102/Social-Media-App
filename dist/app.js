"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const express_1 = tslib_1.__importDefault(require("express"));
const connect_mongodb_session_1 = tslib_1.__importDefault(require("connect-mongodb-session"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const mongoose_1 = require("mongoose");
const database_1 = require("database/database");
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_config_1 = require("config/passport-config");
const MongoDBSession = (0, connect_mongodb_session_1.default)(express_session_1.default);
(0, dotenv_1.config)();
(0, passport_config_1.passportConfig)(passport_1.default);
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.store = new MongoDBSession({ uri: process.env.MONGODB_URI, collection: 'user-session' });
        this.connectToDB();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening to PORT ${this.port}`);
        });
    }
    connectToDB() {
        (0, mongoose_1.connect)(database_1.dbConnection.uri, database_1.dbConnection.options)
            .then(() => {
            console.log("Connected to Database.");
        })
            .catch((error) => {
            console.log(error);
        });
    }
    initializeMiddlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_session_1.default)({
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
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map