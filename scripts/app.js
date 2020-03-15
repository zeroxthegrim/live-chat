const chatList = document.querySelector(".chat-list");
const newChat = document.querySelector(".new-chat");
const newName = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
const allBtns = document.querySelectorAll(".chat-rooms .btn");
const generalRoomBtn = document.querySelector(".chat-rooms #general");





// sending new messages
newChat.addEventListener("submit", e => {
    e.preventDefault();

    const message = newChat.message.value.trim();
    chatroom.addChat(message)
        .then(() => {
            newChat.reset();
            chatUI.setScrollbar();
        })
        .catch(err => console.log(err));
});


// changing username
newName.addEventListener("submit", e => {
    e.preventDefault();

    const username = newName.name.value.trim();
    chatroom.changeUsername(username);
    newName.reset();

    updateMssg.textContent = `You have changed your name to ${username}`;
    
    setInterval(() => {
        updateMssg.textContent = "";
    }, 3000);
});

rooms.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        console.log(e.target);
        chatUI.highlightBtn(e.target);
        chatUI.clear();
    
        chatroom.changeRoom(e.target.getAttribute("id"));
        chatroom.getChats(chats => chatUI.render(chats));
    }
});

const user = localStorage.username ? localStorage.username : "anon"

const chatroom = new Chatroom(user, "general");
const chatUI = new ChatUI(chatList, allBtns);



chatroom.getChats(data => chatUI.render(data));

//
chatUI.highlightBtn(generalRoomBtn);

// scrolls the scroll bar to the bottom
// setTimeout(() => {
//     chatUI.setScrollbar();
// }, 500);



