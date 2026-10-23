import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  let database: "connected" | "disconnected" = "connected";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    console.error("DB health check failed:", err);
    database = "disconnected";
  }
  res.status(database === "connected" ? 200 : 503).json({
    status: database === "connected" ? "ok" : "degraded",
    service: "finlo-api",
    database,
    time: new Date().toISOString(),
  });
});

export default router;
