import { Router } from "express";


const healthCheckRoute = new Router();

healthCheckRoute.get("/", (req, res) => {
    return res.json({ status: "ok"});
})

export default healthCheckRoute;