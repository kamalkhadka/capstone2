import { Router } from 'express';
const router = new Router();

// Secure routes
// GET: /portfolio
// POST: /portfolio
// GET: /portfolio/:id

router.get("/portfolio/:symbol", (req, res) => {
    return res.json(`${req.params.symbol}`);
});

export default router;
