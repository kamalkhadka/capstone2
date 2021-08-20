import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../db.js';
import { ensureAdmin } from '../middleware/auth.js';
import bcrypt from "bcrypt";
import { BCRYPT_WORK_FACTOR } from '../config.js';

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
             RETURNING id`, [firstName, lastName, email, hash]);

        return res.status(StatusCodes.CREATED).json("User created");;

    } catch (e) {
        return next(e);
    }
})

// Update user, return user
router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, oldPass, newPass } = req.body;

        const results = await db.query(
            'UPDATE users set password=$1 WHERE id=$2 RETUNING *', [newPass, id]
        );

        return res.send(results.rows);
    } catch (e) {
        return next(e);
    }
})

// Soft delete a user
router.delete("/:id", async (req, res, next) => {
    try {
        // update user set active = 0
        return res.json({ message: "DELETED" });
    } catch (e) {
        return next(e);
    }
})

// Get user by id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const users = await db.query('SELECT id, email FROM users WHERE id = $1', [id]);
        const securities = await db.query('SELECT id, symbol FROM securities WHERE user_id=$1', [id]);

        const user = users.rows[0];
        user.securities = securities.rows;

        return res.send(user);
    } catch (e) {
        return next(e);
    }
});


export default router;
