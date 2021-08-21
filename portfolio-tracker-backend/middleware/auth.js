import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import ExpressError from "../expressError.js";

export default function authenticateJWT(req, res, next) {
    try {
        const payload = jwt.verify(req.body.token || req.query.token, SECRET_KEY);
        req.user = payload;

        return next();

    } catch (e) {
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

        if(req.user.id !== req.param.id){
            throw new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }

        return next();
   
}