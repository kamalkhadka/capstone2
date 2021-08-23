import { Router } from 'express';
import { yesterday } from '../api.js';

const router = new Router();

router.get("/:symbol", async (req, res, next) => {
    return res.send(await yesterday(req.params.symbol));
});

export default router;