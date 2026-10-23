import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { globalLimiter } from "./middleware/rateLimiters.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json({ limit: "1mb" }));
app.use(globalLimiter);

app.use("/health", healthRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
