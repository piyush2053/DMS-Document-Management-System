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

let TempEmail = 'Test';
const logDirectory = path.join(__dirname, 'log');

function logToFile(email, action, details) {
  if (action !== 'Directory Creation' && action !== 'File Upload' && action !== 'Delete Files') {
    return;
  }

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  const logFilePath = path.join(logDirectory, `${email}.json`);
  const logEntry = {
    timestamp: new Date().toISOString(),
    action: action,
    details: details
  };

  let logData = [];
  if (fs.existsSync(logFilePath)) {
    logData = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
  }

  logData.push(logEntry);
  fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!TempEmail) {
      return cb(new Error("Email is required"), false);
    }
    const uploadPath = path.join(__dirname, 'DB', TempEmail);
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

// File upload
app.post('/uploadFile', upload.single('file'), (req, res) => {
  const email = req.body.email;
  TempEmail = email;
  
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  if (req.file) {
    logToFile(email, 'File Upload', {
      originalName: req.file.originalname,
      timestamp: new Date().toISOString()
    });
    res.status(200).send({ message: "File uploaded successfully", file: req.file });
  } else {
    res.status(400).send({ message: "File is required" });
  }
});

// Create directory
app.post('/createSpace', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const dirPath = path.join(__dirname, 'DB', email);

  try {
    fs.mkdirSync(dirPath, { recursive: true });
    logToFile(email, 'Directory Creation', {
      directory: dirPath,
      timestamp: new Date().toISOString()
    });
    res.status(200).send({ message: "Directory created successfully" });
  } catch (err) {
    console.error('Error creating directory:', err);
    res.status(500).send({ message: "Failed to create directory" });
  }
});

// Remove logging from the 'List Files' API
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

// Delete files
app.post('/deleteFiles', (req, res) => {
  const { email, files } = req.body;

  if (!email || !Array.isArray(files)) {
    return res.status(400).send({ message: "Email and list of files are required" });
  }

  const dirPath = path.join(__dirname, 'DB', email);

  try {
    if (!fs.existsSync(dirPath)) {
      return res.status(404).send({ message: "Directory not found" });
    }

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    logToFile(email, 'Delete Files', {
      deletedFiles: files,
      timestamp: new Date().toISOString()
    });

    res.status(200).send({ message: "Files deleted successfully" });
  } catch (err) {
    console.error('Error deleting files:', err);
    res.status(500).send({ message: "Failed to delete files" });
  }
});

// Fetch logs
app.post('/getLogs', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const logFilePath = path.join(logDirectory, `${email}.json`);

  try {
    if (!fs.existsSync(logFilePath)) {
      return res.status(404).send({ message: "Log file not found" });
    }

    const logData = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
    res.status(200).send(logData);
  } catch (err) {
    console.error('Error reading log file:', err);
    res.status(500).send({ message: "Failed to read log file" });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
