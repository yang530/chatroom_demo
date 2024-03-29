//this script controls frontend the chat section
let form2 = document.getElementById("form2");
let uTarget = document.getElementById("uTarget");
let input2 = document.getElementById("input2");
let messages = document.getElementById("messages");

form2.addEventListener("submit", function(e) {
  	e.preventDefault();
  	if (input2.value) {
    	socket.emit("chat message", input2.value, uTarget.value);
		if(uTarget.value === ""){
			addMessage(`You: ${input2.value}`, true);
		}else{
			addMessage(`You (to ${uTarget.value}): ${input2.value}`, true);
		}
    	input2.value = "";
		uTarget.value = "";
  	}
});

socket.on("chat message", (msg)=>{
  	addMessage(msg, false);
});

socket.on("user update", (num, notification)=>{
	status_uNum.innerText = `users connected: ${num}`;
	addMessage(notification, false);
})

//function to put the message received on the chat window
function addMessage(msg, isMyself=false){

	let nuMsg = document.createElement("li");
  	nuMsg.innerText = msg;
	if(isMyself == true){
		nuMsg.classList.add("myself");
	}
  	messages.appendChild(nuMsg);
  	window.scrollTo(0, document.body.scrollHeight);

}