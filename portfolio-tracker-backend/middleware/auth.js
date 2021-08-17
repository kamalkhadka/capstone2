import { StatusCodes } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import ExpressError from "../expressError.js";

export default function authenticateJWT(req, res, next) {
    try {
        const payload = jsonwebtoken.verify(req.headers.token, SECRET_KEY);
        req.user = payload;

        return next();

    } catch (e) {
        return next();
    }
}

export function ensureLoggedIn(req, res, next){
    if(!req.user){
       return next(new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED));
    }else{
        return next();
    }
}

export function ensureAdmin(req, res, next){
    if(!req.user || req.user.role !== 'admin'){
        return next(new ExpressError("Unauthorized.", StatusCodes.UNAUTHORIZED));
    }

    return next();
}

export function ensureUser(req, res, next){
    if(!req.user || req.user.role !== 'user'){
        return next(new ExpressError("Unauthorized"), StatusCodes.UNAUTHORIZED);
    }

    return next();
}