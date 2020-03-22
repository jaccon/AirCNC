const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');
const { uploadUrl, uploadPath, tcpPort} = require('./config/settings');


const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://aircnc:aircnc@cluster0-5hccz.gcp.mongodb.net/aircnc?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

// GET, POST, PUT, DELETE
// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)
app.use(cors());
app.use(express.json());
app.use(uploadUrl, express.static(path.resolve(__dirname, '..', uploadPath)));
app.use(routes);

server.listen(tcpPort);
