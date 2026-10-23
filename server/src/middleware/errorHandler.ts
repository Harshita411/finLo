import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: err.flatten().fieldErrors });
  }

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ error: err.message, details: err.details });
  }

  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    ...(env.NODE_ENV === "development" && { debug: String(err) }),
  });
};
