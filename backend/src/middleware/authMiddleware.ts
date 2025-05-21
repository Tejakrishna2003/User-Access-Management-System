import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Invalid or missing Authorization header" });
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string };
      if (!roles.includes(decoded.role)) {
        res.status(403).json({ message: "Access denied" });
        return;
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  };
};

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string };
    }
  }
}