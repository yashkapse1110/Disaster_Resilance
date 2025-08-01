import { Request, Response,NextFunction } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt"; 
import { JwtPayload } from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomUUID()}.jpeg`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  },
});

// Middleware for handling the image upload (single image)
export const uploadImage = upload.single("image"); // 'image' is the field name in the form

// This function checks if a username and/or password is valid
export const validateCredentials = (username?: string, password?: string) => {
  let errors: string[] = [];

  if (username) {
    if (!username.trim()) {
      errors.push("Username is required");
    }
    if (!/^[a-zA-Z]+$/.test(username.trim())) {
      errors.push("Username must contain only alphabetic characters");
    }
    if (username.length < 3 || username.length > 20) {
      errors.push("Username must be between 3 and 20 characters");
    }
  }

  if (password) {
    if (!password.trim()) {
      errors.push("Password is required");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
  }

  return errors;
};

export const registerUser = async (req: Request, res: Response) => {
  console.log("🔥 Reached registerUser");
  console.log("📥 REGISTER REQUEST BODY:", req.body);

  try {
    const { username, password, phoneNumber } = req.body;

    // ✅ Check if phoneNumber already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      phoneNumber, // ✅ Now it's correctly passed
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    console.error("❌ REGISTER ERROR:", error?.message);
    return res.status(400).json({
      message: "Error registering user",
      error: error?.message || error,
    });
  }
};



export const loginUser = async (req: Request, res: Response) => {
  console.log("🔥 Reached loginUser"); 
  console.log("📥 Signin REQUEST BODY:", req.body);
  try {
    const { phone, password } = req.body;

    // Basic check
    if (!phone || !password) {
       res.status(400).json({ message: "Phone and password are required" });
    }

    // Find user by phone number
    const user = await User.findOne({ phoneNumber: phone });
    if (!user) {
       res.status(401).json({ message: "User not found" });
    }

    // Compare entered password with hashed password
    console.log("User found:", user);
    console.log("Entered password:", password);
    if (!user) {
      res.status(401).json({ message: "User not set" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(401).json({ message: "Invalid password" });
       return;
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // Send token and user
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
  message: "Login successful",
  user: user,
  token: token,
});
  } catch (error: any) {
    console.error("❌ REGISTER ERROR:", error?.message);
    return res.status(400).json({
      message: "Error registering user",
      error: error?.message || error,
    });
  }
};

export const verifyUser = (req: Request, res: Response) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
     res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (err) {
       res.status(403).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ message: "Token valid", user: decoded });
  });
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user", error });
  }
};

export const getAllUsersAroundLocation = async (
  req: Request,
  res: Response
) => {
  try {
    const { longitude, latitude, radius } = req.query;
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: Number(radius) || 5000, // 5 km default
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users", error });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Role updated", user });
  } catch (err) {
    console.error("Role update failed", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};