import { Router } from 'express';
const portfolioRouter = new Router();

// Secure routes
// GET: /portfolio
// POST: /portfolio
// GET: /portfolio/:id
portfolioRouter.get("/", (req, res) => {
    return res.json("Portfolio");
})

portfolioRouter.get("/:symbol", (req, res) => {
    return res.json(`${req.params.symbol}`);
});

export default portfolioRouter;
