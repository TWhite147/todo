import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else res.status(401).json({ message: "Unauthorized" });
};
