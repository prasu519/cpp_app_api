const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/complaints");

// Create upload folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const fileName = `complaint_${Date.now()}_${Math.round(
      Math.random() * 1e6
    )}${extension}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow image files
  if (file.fieldname === "photo" && file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  // Allow supported audio formats
  const allowedAudioTypes = [
    "audio/mpeg",
    "audio/mp3",
    "audio/mp4",
    "audio/m4a",
    "audio/x-m4a",
    "audio/aac",
    "audio/wav",
    "audio/x-wav",
    "audio/webm",
    "audio/3gpp",
    "audio/ogg",
  ];

  if (file.fieldname === "voice" && allowedAudioTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new Error("Invalid file type. Upload an image as photo or audio as voice."),
    false
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
    files: 2, // Maximum one photo and one voice recording
  },
});

module.exports = upload;
