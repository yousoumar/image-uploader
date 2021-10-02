const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.static("public"));
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
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    console.log(req.file);
    const path = "/images/uploads/" + req.file.filename;
    res.json({ path });
  } else throw "error";
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
