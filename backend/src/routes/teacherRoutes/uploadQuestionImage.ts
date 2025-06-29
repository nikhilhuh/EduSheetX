// routes/upload.ts
import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Set your backend domain here (you can also use localhost:4000 directly)
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Relative to project root
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// Accept only image files
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

// route
router.post("/", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No image uploaded" });
    return;
  }

  const absoluteUrl = `${BASE_URL}/uploads/${req.file.filename}`;
   res.status(200).json({ path: absoluteUrl });
   return;
});

export { router };
