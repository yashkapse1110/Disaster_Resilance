import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export type IUser = {
  id: string;
  role: "user" | "admin";
};

// Middleware to check the token and attach user info to req.user
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Extract the token from cookies
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token provided in cookies" });
    return;
  }

  // Verify the token and extract user information
  jwt.verify(
    token,
    process.env.JWT_SECRET || "secret",
    (err: Error | null, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      // Attach the user information to the request object
      req.user = decoded as IUser; // Assumes the decoded token contains user info in `user` field
      next();
    }
  );
};

export default authenticateToken;
