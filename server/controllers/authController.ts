import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface CustomRequest extends Request {
  userId?: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token, user: { id: user._id, email: user.email } });
    } else res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const me = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (user) res.json({ id: user._id, email: user.email });
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
