import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUser } from "../types/User";

export interface AuthRequest extends Request {
  user?: JwtUser;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Brak tokenu autoryzacji" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecret"
    ) as JwtUser;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Nieprawidłowy lub wygasły token" });
  }
};
