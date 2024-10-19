import { Request, Response, NextFunction } from "express";
import { logger, sendResponse } from "@utils";
import { AppError } from "@services/error.service";

export default (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const details = {
    name: error.name,
    stack: error.stack,
    // details: error.details
  }

  const statusCode = error?.statusCode || 500
  
  logger.error({ errorDetails: error });
  return sendResponse(res, statusCode, false, error.message, details);
};