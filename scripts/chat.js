class Chatroom {
    constructor(username, room) {
        this.username = username;
        this.room = room;
        this.unsub;
    }
    async addChat(message) {
        const now = new Date();
        const document = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await db.collection("chats").add(document);
        return response;
    }
    getChats(callback) {
        this.unsub = db.collection("chats")
            .where("room", "==", this.room)
            .orderBy("created_at")
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(doc => {
                    if (doc.type === "added") {
                        callback(doc.doc.data());
                    }
                });
            });
        setTimeout(() => {
            chatUI.setScrollbar();
        }, 400);         
    }
    changeUsername(username) {
        this.username = username;
        localStorage.setItem("username", username);
    }
    changeRoom(room) {
        this.room = room;
        if (this.unsub) {
          this.unsub();
        }
        
    }
}




