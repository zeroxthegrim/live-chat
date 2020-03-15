class ChatUI {
    constructor(list, roomBtns) {
        this.list = list;
        this.roomBtns = roomBtns;
    }
    clear() {
        this.list.innerHTML = "";
    }
    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        )
        
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;
        this.list.innerHTML += html;
    }
    setScrollbar() {
        this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
        console.log("setting scrollbar");
    }
    highlightBtn(selectedBtn) {
        this.roomBtns.forEach(btn => {
            if (btn.classList.contains("selected-btn")) {
                btn.classList.remove("selected-btn");
            }
        });
        selectedBtn.classList.add("selected-btn");
    }

}
