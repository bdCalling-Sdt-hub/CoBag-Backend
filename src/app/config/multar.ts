import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store files in "uploads/" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`); // Unique filename
  },
});

// File filter to allow specific file types
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|pdf/; // Allowed file types
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpeg, jpg, png) and PDFs are allowed!')); // Invalid file type
  }
};

// Initialize multer
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});
