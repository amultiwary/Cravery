import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, image, cb) => {
    return cb(null, `${Date.now()}-${image.originalname}`);
  },
});

export const upload = multer({ storage: storage });
