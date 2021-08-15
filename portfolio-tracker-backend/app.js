import express, { json } from 'express';
import morgan from 'morgan';
import portfolioRouter from './portfolioRoutes.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import healthCheckRoute from './routes/healthcheck.js';

const app = express();

// Middleware
app.use(json());
app.use(morgan('dev'));

// Routes
app.use(authRoutes);
app.use("/health-check", healthCheckRoute);
app.use("/users", userRoutes);
app.use("/portfolio", portfolioRouter);

// 404 Handler
app.use((req, res, next) => {
    const notFound = new ExpressError("Page Not Found", 404);
    next(notFound);
})

// General Error Handler
app.use((error, req, res, next) => {
    let status = error.status || 500;
    return res.status(status).json({
        errorMessage: error.message
    });
});

export default app;