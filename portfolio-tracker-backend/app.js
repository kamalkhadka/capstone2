import express, { json } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import healthCheckRoute from './routes/healthcheck.js';
import authenticateJWT from './middleware/auth.js';
import securitiesRoutes from './routes/securities.js';
import Symbol from './models/symbols.js';


const app = express();

// Middleware
app.use(json());
app.use(authenticateJWT)
app.use(morgan('dev'));

// populate symbols
Symbol.getAll();

// Routes
app.use(authRoutes);
app.use("/health-check", healthCheckRoute);
app.use("/users", userRoutes);
app.use("/securities", securitiesRoutes);

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