import { Router } from "express";
import bcrypt from "bcrypt";
import DB_URI, { BCRYPT_WORK_FACTOR } from "../config.js";
import client from "../db.js";
import ExpressError from "../expressError.js";
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from "jsonwebtoken";

const authRoutes = new Router();

// Register a user
authRoutes.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        validateUser(email, password);

        const user = getUserByEmail(email);

        if (user) {
            throw new ExpressError("Email exist. Please log in.", StatusCodes.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const results = await client.query(
            `INSERT INTO users (email, password) 
             VALUES ($1, $2)
             RETURNING id`, [email, hashedPassword]);

        return res.send(results.rows[0]);

    } catch (e) {
        return next(e);
    }
});


// Login
authRoutes.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        validateUser(email, password);

        const user = await getUserByEmail(email);

        if(user){

            if(await bcrypt.compare(password, user.password)){
                const token = jsonwebtoken.sign({id: user.id, role: user.role})
                return res.json("Logged in");
            }else{
                throw new ExpressError("Invalid email/password.", StatusCodes.BAD_REQUEST);
            }

        }else{
            throw new ExpressError("User not found", StatusCodes.BAD_REQUEST);
        }
    } catch (e) {
        return next(e);
    }
});

async function getUserByEmail(email) {
    const users = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return users.rows[0];
}

function validateUser(email, password) {
    if (!email || !password) {
        throw new ExpressError("Email and password required.", StatusCodes.BAD_REQUEST);
    }
}

export default authRoutes;