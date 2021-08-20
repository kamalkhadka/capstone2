import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = new Router();

router.get("/", async (req, res, next) => {
    console.log("HOME");
    return res.send("HOME");
});

export default router;