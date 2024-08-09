const multer = require('multer');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, 'log');

exports.logToFile = (email, action, details) => {
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
};

exports.getStorageConfig = (email) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      if (!email) {
        return cb(new Error("Email is required"), false);
      }
      const uploadPath = path.join(__dirname, 'DB', email);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
};