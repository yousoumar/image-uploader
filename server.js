const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json());

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
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    console.log(req.file);
    res.locals.path = "/images/uploads/" + req.file.filename;
    res.render("index");
  } else throw "error";
});

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});
