import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { mostActive, winners, slaggers } from '../api.js';

const router = new Router();

router.get("/", async (req, res, next) => {
    const actives = await mostActive();
    const gainers = await winners();
    const  losers = await slaggers();
    return res.send({ actives, gainers, losers});
});

export default router;