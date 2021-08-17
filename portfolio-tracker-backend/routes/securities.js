import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../db.js';
import ExpressError from '../expressError.js';
import { ensureLoggedIn, ensureUser } from '../middleware/auth.js';

const securitiesRoutes = new Router();

securitiesRoutes.use(ensureLoggedIn);
securitiesRoutes.use(ensureUser);

// Get all securities for a user
securitiesRoutes.get("/", async (req, res, next) => {
    try {
        const securities = 
            await db.query('SELECT id, symbol, quantity FROM securities WHERE user_id=$1', 
                [req.user.id]);

        if(securities.rows[0].user_id != req.user.id){
            throw new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }

        return res.json({ securities: securities.rows });
    } catch (e) {
        return next(e);
    }
});

// Post a security
securitiesRoutes.post("/", async (req, res, next) => {
    try {
        const { symbol, quantity, price } = req.body;

        const symResults = await db.query('SELECT id, symbol FROM symbols WHERE symbol = $1', [symbol]);       

        if(!symResults.rows[0] || symResults.rows[0].symbol !== symbol){
            throw new ExpressError("Invalid symbol", StatusCodes.BAD_REQUEST);
        }

        const results = await db.query('INSERT INTO securities(symbol_id,  user_id) VALUES ($1, $2) RETURNING id',
            [symResults.rows[0].id, req.user.id]);

        await db.query(`INSERT INTO transactions 
                        (price, quantity, user_id, security_id)
                        VALUES
                        ($1, $2, $3, $4)`, 
                        [price, quantity, req.user.id, results.rows[0].id]);

        return res.status(201).json(results.rows);
    } catch (e) {
        return next(e);
    }
})

// Update security
securitiesRoutes.patch("/:id", async (req, res, next) => {
    try {
    
        return res.send("SECURITY UPDATED");
    } catch (e) {
        return next(e);
    }
})

// Delete a security
securitiesRoutes.delete("/:id", async (req, res, next) => {
    try {
       
        return res.json("SECURITY DELETED");
    } catch (e) {
        return next(e);
    }
})

// Get security by id
securitiesRoutes.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        return res.send("GET SECURITY BY ID");
    } catch (e) {
        return next(e);
    }
});


export default securitiesRoutes;
