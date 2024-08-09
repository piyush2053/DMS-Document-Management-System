const path = require('path');
const fs = require('fs');
const { logToFile, getStorageConfig } = require('./storage');

let TempEmail = 'Test';

// File upload
exports.uploadFile = (req, res) => {
  const email = req.body.email;
  console.log(email,'-------------')
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
};

// Create directory
exports.createSpace = (req, res) => {
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
};

// List files
exports.listFiles = (req, res) => {
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
};

// Delete files
exports.deleteFiles = (req, res) => {
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
};

// Fetch logs
exports.getLogs = (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  const logFilePath = path.join(__dirname, 'log', `${email}.json`);

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
};
