const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Health ok")
})
app.post('/', (req, res) => {
  res.send("Health ok")
})

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
