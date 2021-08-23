import express, { json } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import homeRoutes from "./routes/home.js";
import stockRoutes from "./routes/stocks.js";
import healthCheckRoute from './routes/healthcheck.js';
import authenticateJWT from './middleware/auth.js';
import securitiesRoutes from './routes/securities.js';
import Symbol from './models/symbols.js';
import cors  from "cors";


const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(authenticateJWT)
app.use(morgan('dev'));

// populate symbols
Symbol.getAll();

// Routes
app.use("/login", authRoutes);
app.use("/health-check", healthCheckRoute);
app.use("/", homeRoutes);
app.use("/stocks", stockRoutes);
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