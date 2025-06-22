import express, { Request, Response } from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import pdfParse from "pdf-parse";
import { askGPT } from "../../configs/openAi/openaiServices";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Extend Request type to include Multer file
import type { File as MulterFile } from "multer";
import { userModel } from "../../models/dbmodels/userModel";
interface MulterRequest extends Request {
  file: MulterFile;
}

router.post(
  "/",
  upload.single("image"),
  async (req: MulterRequest, res: Response) => {
    try {
      const email = req.body.email;
      if (!email) {
        res.status(400).json({ success: false, message: "Email is required." });
        return;
      }
      // Validate user
      const user = await userModel.findOne({ email });
      if (!user || user.role !== "teacher") {
        res.status(403).json({
          success: false,
          message: "Access denied. Only teachers can create tests.",
        });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const buffer = req.file.buffer;
      const isPDF = req.file.mimetype === "application/pdf";

      let extractedText = "";

      if (isPDF) {
        const data = await pdfParse(buffer);
        extractedText = data.text;
      } else {
        const result = await Tesseract.recognize(buffer, "eng");
        extractedText = result.data.text;
      }

      if (!extractedText || extractedText.trim().length < 10) {
        res.status(400).json({ error: "Could not extract enough text" });
        return;
      }

      const questions = await askGPT(extractedText);
      res.json({ questions });
      return;
    } catch (err) {
      console.error("Extraction error:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }
);

export { router };
