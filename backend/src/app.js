const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use((req, res, next) => {
  req.io = io;
  return next();
})

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/version', function(req, res) {
  const response = {
    id: 1,
    date: Date.now(),
    description: 'API test',
    version: '0.0.0',
  };
  
  return res.json(response);
});

const PORT = 3200;
app.listen(PORT, () => {
  console.log(`poc it's a live on port ${PORT}!!`);
})

