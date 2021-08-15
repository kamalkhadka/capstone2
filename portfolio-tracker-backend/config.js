

const DB_URI = (process.env.NODE_ENV === "test")
    ? "postgresql:///portfoliodb_test" : "postgresql:///portfoliodb";

export const BCRYPT_WORK_FACTOR = 12;
export const SECRET_KEY = process.env.SECRET_KEY || "secret";;
export default DB_URI;


