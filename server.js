const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(morgan("dev"));

const fileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg"];

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/images/uploads");
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (!fileExtensions.includes(file.mimetype)) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    const path = process.env.URL + "/images/uploads/" + req.file.filename;
    res.json({ path });
  } else {
    res.json({ path: null });
  }
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening at ${process.env.URL}`);
});
