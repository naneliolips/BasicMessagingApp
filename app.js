const express = require('express')
const socketio = require('socket.io')
const app = express()

//uses ejs as template engine - allows static template files reduces template into HTML file sent to the client
app.set('view engine', 'ejs')
app.use(express.static('public'))

//routing method - handle GET requests
app.get('/', (req, res)=> {
  //render a view template at Home page '/'
  res.render('index')
})

//starts a server and listens on port 3000 for connections
const server = app.listen(process.env.PORT || 3000, () => {
  //responds with below to requests or 404 to incorrect paths
  console.log("The server is working")
})

//init socket.io from the server (express connection)
const io = socketio(server)

//Will be triggered every time a new connection to the socket gets established
io.on('connection', socket => {
  socket.username = "Incognito"
  socket.on('change_username', data => {
    socket.username = data.username
  })

  //handle new message from client sent to all users connected to the server
  socket.on('new_message', data => {
    io.sockets.emit('receive_message', {message: data.message, username: socket.username})
  })
})
