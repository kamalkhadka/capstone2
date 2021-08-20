import { Router } from "express";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "../config.js";
import db from "../db.js";
import ExpressError from "../expressError.js";
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from "jsonwebtoken";
import jsonschema from "jsonschema";
import  loginSchema from "../schemas/loginSchema.js";

const authRoutes = new Router();


// Login
authRoutes.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        validateLogin(email, password);

        const user = await getUserByEmail(email);

        if (user) {

            if (await bcrypt.compare(password, user.password)) {
                const token = jsonwebtoken.sign({ id: user.id, role: user.role }, SECRET_KEY);
                return res.json({ token });
            } else {
                throw new ExpressError("Invalid email/password.", StatusCodes.BAD_REQUEST);
            }

        } else {
            console.log('User not found');
            throw new ExpressError("Invalid email/password", StatusCodes.BAD_REQUEST);
        }
    } catch (e) {
        return next(e);
    }
});

async function getUserByEmail(email) {
    const users = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return users.rows[0];
}

function validateLogin(email, password) {

    const result = jsonschema.validate({email, password}, loginSchema)

    if(!result.valid){
        throw new ExpressError("Email and password required.", StatusCodes.BAD_REQUEST);
    }
}

export default authRoutes;