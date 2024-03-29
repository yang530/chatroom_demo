//this script controls the frontend landing section
let socket = io("http://localhost:3000/");
let username = "";

const input1 = document.getElementById("input1");
const form1 = document.getElementById("form1");
const info1 = document.getElementById("info1");
const sect_landing = document.getElementById("landing");
const sect_chat = document.getElementById("chat");
const status_uName = document.getElementById("uName");
const status_uId = document.getElementById("uId");
const status_uNum = document.getElementById("uNum");

form1.addEventListener("submit", (event)=>{
    event.preventDefault();
    if(input1.value){
        socket.emit("try username", input1.value);
        username = input1.value;
        input1.value = "";
    }
});

socket.on("username ok", (msg, num)=>{
    info1.innerText = msg;
    sect_landing.classList.remove("active");
    sect_chat.classList.add("active");

    status_uName.innerText = `username: ${username}`;
    status_uId.innerText = `user id: ${socket.id}`;
    status_uNum.innerText = `users connected: ${num}`;
    addMessage(`You join the room as ${username}.`, true);
});

socket.on("username taken", (msg)=>{
    info1.innerText = msg;
});

