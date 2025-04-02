const loading ={
    container: document.querySelector('.loading'),
    in(page){
        this.container.classList.remove('loading_out');
        setTimeout(()=>{
            window.location.href = page;
        },1000);
    },
    out(){
        this.container.classList.add('loading_out'); 
    }
}

window.addEventListener('load',()=>{
        loading.out();
})


//websocket
const wsUrl = "ws://81.69.249.69:9000";

const socket = new WebSocket(wsUrl);

socket.onopen = function(event) {
    console.log("WebSocket 连接已打开");
    appendMessage("系统","连接已打开");
};

socket.onmessage = function(event) {
    if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
            console.log("收到消息: ", reader.result);
            appendMessage("服务器",reader.result);
        };
        reader.readAsText(event.data);
    } else {
        console.log("收到消息: ", event.data);
        appendMessage("服务器", event.data);
    }
};

socket.onclose = function(event) {
    console.log("WebSocket 连接已关闭");
    appendMessage("系统","连接已关闭");
};

// 发送消息
function sendMessage() {
    const message = document.getElementById("messageInput").value;
    socket.send(message);
    appendMessage("你",message);
    document.getElementById("messageInput").value = "";
}

// 添加消息到日志
function appendMessage(name,message) {
    const messagesContainer = document.getElementById("messageContainer");
    const div = document.createElement("div");
    // 获取当前时间戳
    const timestamp = new Date().toLocaleString();
    div.classList.add("message");
    div.innerHTML =
                `
                <h4>${name}</h4>
                <p>${message}</p>
                <p class="timestamp">${timestamp}</p>
                `;
    messagesContainer.appendChild(div);
    div.classList.add('messageFadeIn');
     // 滚动到底部
     messagesContainer.scrollTop = messagesContainer.scrollHeight;
}