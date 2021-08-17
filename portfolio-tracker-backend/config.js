import dotenv from 'dotenv'
dotenv.config(); 

const DB_URI = (process.env.NODE_ENV === "test")
    ? process.env.DB_URI + "_test" : process.env.DB_URI;

export const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR;;
export const SECRET_KEY = process.env.SECRET_KEY || "secret";;
export const API_TOKEN = process.env.API_TOKEN;
export const API_VERSION = process.env.API_VERSION;
export default DB_URI;


