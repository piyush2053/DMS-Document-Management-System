const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let TempEmail = 'Test'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!TempEmail) {
      return cb(new Error("Email is required"), false);
    }
    const uploadPath = path.join(__dirname, 'DB', TempEmail);
    console.log(uploadPath)
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/uploadFile', upload.single('file'), (req, res) => {
  if (req.file) {
    const email = req.body.email;
    TempEmail = email
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    res.status(200).send({ message: "File uploaded successfully", file: req.file });
  } else {
    res.status(400).send({ message: "File is required" });
  }
});

app.post('/createSpace', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const dirPath = path.join(__dirname, 'DB', email);

  try {
    fs.mkdirSync(dirPath, { recursive: true });
    res.status(200).send({ message: "Directory created successfully" });
  } catch (err) {
    console.error('Error creating directory:', err);
    res.status(500).send({ message: "Failed to create directory" });
  }
});

app.post('/listFiles', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const dirPath = path.join(__dirname, 'DB', email);

  try {
    if (!fs.existsSync(dirPath)) {
      return res.status(404).send({ message: "Directory not found" });
    }

    const files = fs.readdirSync(dirPath).map(file => {
      return {
        name: file,
        extension: path.extname(file)
      };
    });

    res.status(200).send(files);
  } catch (err) {
    console.error('Error reading directory:', err);
    res.status(500).send({ message: "Failed to read directory" });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
