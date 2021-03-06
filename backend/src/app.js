const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const user = 'jorge';
const password = 'jorge';

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0-ii4eh.mongodb.net/poc-live-update?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
});


io.on('connection', socket => {
  console.log(`Socket conectado ${socket.id}`);
  
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log("user disconnected");
  })
});

app.use((req, res, next) => {
  req.io = io;
  return next();
})

app.use(cors());
app.use(express.json());
app.use(require('./routes'));



const PORT = 3200;
server.listen(PORT, () => {
  console.log(`poc it's a live on port ${PORT}!!`);
});

module.exports = io;