import express, { json } from 'express';
import morgan from 'morgan';
import portfolioRouter from './portfolioRoutes.js';
import userRoutes from './userRoutes.js';

const app = express();

// Middleware
app.use(json());
app.use(morgan('dev'));

// Routes
app.use("/users", userRoutes);
app.use("/portfolio", portfolioRouter);

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