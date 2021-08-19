import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import client from '../db.js';
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

        const results = await db.query('INSERT INTO securities(symbol,  user_id) VALUES ($1, $2) RETURNING id',
            [symbol, req.user.id]);

        await db.query(`INSERT INTO transactions 
                        (price, quantity, security_id)
                        VALUES
                        ($1, $2, $3)`, 
                        [price, quantity, results.rows[0].id]);

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

        // select a security
        const results = await client.query('SELECT id, user_id FROM securities WHERE id = $1', [req.params.id]);
        // make sure it matches the user
        if(!results.rows[0] || results.rows[0].user_id != req.user.id){
            throw new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }
        // delete a security
        await client.query('DELETE FROM securities WHERE id = $1', [req.params.id]);

        return res.json({deleted: req.params.id});
    } catch (e) {
        return next(e);
    }
})

// Get security by id
securitiesRoutes.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const results = await client.query('SELECT symbol_id, user_id, id FROM securities WHERE id = $1', [id]);

        const security = results.rows[0];

        if(security.user_id !== req.user.id){
            throw new ExpressError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }else{
            const symResults = await client.query('SELECT symbol, name FROM symbols WHERE id = $1', [security.symbol_id]);

            if(symResults.rows[0]){
                const tranResults = await client.query('SELECT price, quantity FROM transactions WHERE security_id = $1', [security.id]);
                return res.send({ ...symResults.rows[0], transactions: tranResults.rows[0] === undefined ? [] : tranResults.rows[0]});
            }else{
                // should not end here
                return res.send({status: "should not end here"});
            }
            
        }
    } catch (e) {
        return next(e);
    }
});


export default securitiesRoutes;
