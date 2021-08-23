import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../db.js';
import { ensureAdmin, ensureUser } from '../middleware/auth.js';
import bcrypt from "bcrypt";
import { BCRYPT_WORK_FACTOR, SECRET_KEY } from '../config.js';
import ExpressError from '../expressError.js';
import jwt from "jsonwebtoken";
import sqlForPartialUpdate from '../helpers/partialUpdate.js';

const router = new Router();


// Get all users
router.get("/", ensureAdmin, async (req, res, next) => {
    try {
        const result = await db.query(`SELECT * FROM users`);

        return res.json({ users: result.rows });
    } catch (e) {
        return next(e);
    }
});


// Search a user
router.get("/search", async (req, res, next) => {
    try {
        const { type } = req.query;
        const results = await db.query('SELECT * FROM users WHERE type=$1', [type]);

        return res.json(results.rows);
    } catch (e) {
        return next(e);
    }
});

// Post a user
router.post("/", async (req, res, next) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        // validate inputs
        // check user exist with input email

        const hash = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const results = await db.query(
            `INSERT INTO users (firstName, lastName, email, password) 
             VALUES ($1, $2, $3, $4)
             RETURNING id, role`, [firstName, lastName, email, hash]);

        const user = results.rows[0];

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);

        return res.status(StatusCodes.CREATED).json({ token });;

    } catch (e) {
        return next(e);
    }
})

// Update user, return user
router.patch("/:id", ensureUser, async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, BCRYPT_WORK_FACTOR);
        }

        if (req.body.token) {
            delete req.body.token;
        }

        let { query, values } = sqlForPartialUpdate("users", req.body, "id", id);

        const results = await db.query(query, values);

        const user = results.rows[0];

        if(user){
            delete user.password;
            delete user.role;
            delete user.active;
        }

        return res.send(user);
    } catch (e) {
        console.log(e.message);
        return next(e);
    }
})


router.delete("/:id", ensureUser, async (req, res, next) => {
    try {
        await db.query(`DELETE FROM users WHERE id=$1`, [req.params.id]);
        return res.json({ message: "DELETED" });
    } catch (e) {
        return next(e);
    }
})

// Get user by id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.user || Number(id) !== req.user.id) {
            console.log("User id mismatch");
            throw new ExpressError("Unauthorized.", StatusCodes.UNAUTHORIZED);
        }

        const users = await db.query('SELECT id, firstName, lastName, email FROM users WHERE id = $1', [id]);
        const user = users.rows[0];

        return res.send(user);
    } catch (e) {
        return next(e);
    }
});


export default router;
