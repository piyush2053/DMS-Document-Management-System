const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const controllers = require('./Controller');
const { getStorageConfig } = require('./Storage');
const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let TempEmail = 'Test';

const storage = getStorageConfig(TempEmail);
const upload = multer({ storage: storage });

// Routes
app.post('/uploadFile', upload.single('file'), controllers.uploadFile);
app.post('/createSpace', controllers.createSpace);
app.post('/listFiles', controllers.listFiles);
app.post('/deleteFiles', controllers.deleteFiles);
app.post('/getLogs', controllers.getLogs);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
