const express = require('express');
const cors = require('cors');
const tasks = require('./tasks.json');
const app = express();
const port = 3001;

app.use(cors(), express.json())

app.get('/', (req, res) => {
  res.send(tasks)
})

app.post('/login', (req, res) => {
  const reqData = req.body;
  console.log(reqData, reqData.username);
  res.json({user: reqData});
})

app.put('/newTast', (req, res) => {
  const reqData = req.body;
  console.log(reqData, reqData.username);
  res.json({user: reqData});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
