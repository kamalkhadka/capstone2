import { Router } from 'express';
import db from '../db.js';

const router = new Router();

// Get all users
router.get("/", async (req, res, next) => {
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
        const {email, password, type} = req.body;
        const results = await db.query('INSERT INTO users(email, password, type) VALUES ($1, $2, $3) RETURNING *', 
                                [email, password, type]);

        return res.status(201).json(results.rows);
    }catch (e){
        return next(e);
    }
})

router.get("/:id", (req, res) => {

});


export default router;
