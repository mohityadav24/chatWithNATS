export const initSocket = (io) => {
    io.on("connection", socket => {
        console.log("New client connected", socket.id);

        socket.on("join", (chatId) => {
            socket.join(chatId);
            console.log(`Client ${socket.id} joined chat ${chatId}`);
        })

        socket.on("typing", (chatId)=> {
            socket.to(chatId).emit("typing",socket.id);
        })

        socket.on("stopTyping", (chatId)=> {
            socket.to(chatId).emit("stopTyping",socket.id);
        })

        socket.on("disconnect",()=> {
            console.log("Client disconnected", socket.id);
        })
    })
}