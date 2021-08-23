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

export function ensureAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return next(new ExpressError("Unauthorized.", StatusCodes.UNAUTHORIZED));
    }

    return next();
}

export function ensureUser(req, res, next) {

    try {
        
        const payload = jwt.verify(req.body.token || req.query.token, SECRET_KEY);
        req.user = payload;


        if (!req.user) {
            console.log("Missing user from request.");
            throw new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }

        if (req.user.id !== Number(req.params.id)) {
            console.log("User id and parameter id didn't match ", req.user.id, req.params.id);
            throw new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }

        return next();

    } catch (error) {
        console.log(error.message);
        return next(new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED));
    }

}