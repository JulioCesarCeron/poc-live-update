const express = require('express');
const cors = require('cors');

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  console.log('req', req);
  req.io = io;
  return next();
})

app.use(cors());
app.use(express.json());
app.use(require('./routes'))

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`poc it's a live on port ${PORT}!!`);
})

