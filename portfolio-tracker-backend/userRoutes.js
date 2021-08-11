import { Router } from 'express';
const router = new Router();

const USERS = [{usename: "testUser"}]

router.get("/", (req, res) => {
    return res.json({users: USERS});
});

router.get("/:id", (req, res) => {
    
});

export default router;
