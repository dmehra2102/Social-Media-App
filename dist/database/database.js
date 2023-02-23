"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
exports.dbConnection = {
    uri: process.env.MONGODB_URI,
    options: {
        autoIndex: true,
        autoCreate: true
    }
};
//# sourceMappingURL=database.js.map