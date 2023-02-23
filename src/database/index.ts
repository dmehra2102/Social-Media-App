import { config } from "dotenv";

config();

export const dbConnection = {
    uri: process.env.MONGODB_URI,
    options: {
        autoIndex: true,
        autoCreate: true
    }
};
