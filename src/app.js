import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import applicationRoutes from "./routes/applicationRoutes.js";
import requestLogger from "./middleware/requestLogger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.use(requestLogger);

app.use("/api/applications", applicationRoutes);

app.get("/api/slow", (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            success: true,
            message: "Slow request completed after 3 seconds"
        });
    }, 3000);
});

app.get("/api/block", (req, res) => {
    const start = Date.now();

    while (Date.now() - start < 3000) {

    }

    res.status(200).json({
        success: true,
        message: "Blocking operation completed after 3 seconds"
    });
});

app.use(notFound);

app.use(errorHandler);

export default app;