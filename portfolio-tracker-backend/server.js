import express, { json } from 'express';
import userRoutes from './userRoutes.js';

const app = express();

app.use(json());

app.use("/users", userRoutes);

// 404 Handler
app.use((req, res, next) => {
    const notFound = new ExpressError("Page Not Found", 404);
    next(notFound);
})

app.use((error, req, res, next) => {
    let status = error.status || 500;
    return res.status(status).json({
        errorMessage: error.message
    });
});

app.listen(3001, function () {
    console.log('App started on port 3001');
});