//this is the server section
//create library components
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express(); //create express app
const server = http.createServer(app); //create server
const io = socketIo(server); //create socket io connection

const users = {};

app.use(express.static("frontend"));

io.on("connection", (socket) => {
  	console.log(`user ${socket.id} joins the room.`);

	socket.on("try username", (username)=>{
		if(Object.values(users).indexOf(username) == -1){
			users[socket.id] = username;
			socket.emit("username ok", `user: ${username}, created.`, Object.keys(users).length);
			socket.broadcast.emit("user update", Object.keys(users).length, `${username} joins the room`);
		}else{
			socket.emit("username taken", `username ${username} is already taken`);
		}
	});

  	socket.on("disconnect", () => {
		console.log(`user ${users[socket.id]} (${socket.id}) leaves the room.`);
		socket.broadcast.emit("user update", Object.keys(users).length-1, `${users[socket.id]} leaves the room.`);
		delete users[socket.id];
  	});

  	socket.on("chat message", (msg, name) => {
		if(name === ""){
			socket.broadcast.emit("chat message", `${users[socket.id]}: ${msg}`);
		}else{
			let index = Object.values(users).indexOf(name);
			if(index != -1){
				let uTarget = Object.keys(users)[index];
				socket.to(uTarget).emit("chat message", `${users[socket.id]}: ${msg}`);
			}else{
				io.to(socket.id).emit("chat message", "The user you are talking to does not exist or has disconnected.");
			}
		}
  	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
