import { Router } from 'express';
import { yesterday } from '../api.js';
import { ensureUser } from '../middleware/auth.js';
import db from '../db.js';
import ExpressError from '../expressError.js';
import { StatusCodes } from 'http-status-codes';

import _ from 'lodash';

const router = new Router();

router.get("/:symbol", async (req, res, next) => {
    return res.send(await yesterday(req.params.symbol));
});

router.post("/:symbol/:id", ensureUser, async (req, res, next) => {

    try {
        const results = await db.query(`SELECT symbol FROM symbols WHERE symbol=$1`, [req.params.symbol.toUpperCase()]);

        if (!results.rows[0]) {
            throw new ExpressError(`${req.params.symbol} doesn't exist`, StatusCodes.NOT_FOUND);
        }

        // check if it exist first
        let security_id = undefined;
        const checkResults = await db.query(`SELECT id, symbol FROM securities WHERE symbol=$1 AND user_id=$2`, [req.params.symbol, req.params.id]);
        
        
        if (checkResults.rows[0]) {
            security_id = checkResults.rows[0].id;
        } else {
            const securities = await db.query(`INSERT INTO securities (symbol, user_id) VALUES ($1, $2) RETURNING id`, [req.params.symbol, req.params.id]);
            security_id = securities.rows[0].id;
            
        }

        delete req.body.token;

        if (_.isEmpty(req.body)) {
            return res.status(StatusCodes.CREATED).send({ status: 'Added' });
        }

        const stock = req.body;

        if ((stock.price && stock.quantity) || (stock.quantity && stock.price)) {
            const transactions = await db.query(`INSERT INTO transactions (price, quantity, security_id) 
                                            VALUES ($1, $2, $3) RETURNING id`, [stock.price, stock.quantity, security_id]);
            return res.status(StatusCodes.CREATED).send({ status: 'Added' });
        } else {
            throw new ExpressError('Both price and quantity is need.', StatusCodes.BAD_REQUEST);
        }
    } catch (err) {
        return next(err);
    }


})


export default router;