import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type IUser = {
  id: string;
  role: "user" | "admin";
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // ✅ Extract from "Authorization: Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secret",
    (err: Error | null, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = decoded as IUser;
      next();
    }
  );
};

export default authenticateToken;
