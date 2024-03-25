import { Request, Response, NextFunction } from "express";
import { errorConstants } from "./../constants";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  const statusCode: number = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errorConstants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorConstants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorConstants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorConstants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorConstants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
        res.json({
            title: "Generic Error",
            message: err.message,
            stackTrace: err.stack,
          });
      break;
  }
};

export default errorHandler;
