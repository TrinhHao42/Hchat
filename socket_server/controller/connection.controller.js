const disconnect = (socket, connectedUsers) => {
    console.log(`User ngắt kết nối: ${socket.user}`)
    connectedUsers.delete(socket.user)
}

module.exports = {
    disconnect,
}