(function connect(){
  let socket = io.connect('http://localhost:3000')

  //capture index.ejs page data
  let username = document.querySelector('#username')
  let usernameBtn = document.querySelector('#usernameBtn')
  let currentUsername = document.querySelector('.card-header')

  //When the usernameBtn is clicked emit to server with username value and reset
  usernameBtn.addEventListener('click', e => {
    socket.emit('change_username', {username: username.value})
    currentUsername.textContent = username.value
    username.value = ''
  })

  //Get message data
  let message = document.querySelector('#message')
  let messageBtn = document.querySelector('#messageBtn')
  let messageList = document.querySelector('#message-list')

  //listen to the messageBtn and emit message
  messageBtn.addEventListener('click', e => {
    socket.emit('new_message', {message: message.value})
    message.value = ''
  })

  //on message recieved create list item on page with message data
  socket.on('receive_message', data => {
    let listItem = document.createElement('li')
    listItem.textContent = data.username + ':' + data.message
    listItem.classList.add('list-group-item')
    messageList.appendChild(listItem)
  })

})()
