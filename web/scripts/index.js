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

// 复制文本
async function copyText(event,element) {
    const textToCopy = element.innerText;
    try {
        // 如果浏览器不支持Clipboard API或不处于安全上下文中
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        // 将textarea添加到文档中，但不在视口中，并设置为不可见
        element.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // 获取点击位置
        const x = event.clientX;
        const y = event.clientY;

        // 显示提示
        const tooltip = document.getElementById("tooltip");
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.opacity = 1;

        // 渐变消失
        setTimeout(() => {
            tooltip.style.opacity = 0;
        }, 500);
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });

    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

//提交留言表单
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 获取表单数据
    var formData = new FormData(this);

    // 发送AJAX请求
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './web/api/index/submit_message.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('留言提交成功！');
            // 清空表单
            document.getElementById('message-form').reset();
            fetchMessages(); // 重新加载留言名单
        } else {
            alert('留言提交失败，请稍后再试。');
        }
    };
    xhr.send(formData);
});

//加载留言名单
function fetchMessages() {
    fetch('./web/api/index/fetch_messages.php')
        .then(response => response.json())
        .then(data => {
            const messages = document.getElementById('messages');
            messages.innerHTML = ''; // 清空现有内容

            data.forEach((message, index) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML =
                `
                <h4>${message.name}</h4> 
                <p>${message.message}</p>
                <p class="timestamp">${message.timestamp}</p>
                `;
                messages.appendChild(messageElement);

                 // 为每个留言元素添加淡入动画类
                 messageElement.classList.add('messageFadeIn');

                 const delay = (index + 1) * 0.15;
                 // 根据留言元素的索引设置动画延迟
                 messageElement.style.animationDelay = `${delay}s`;
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

// 页面加载完成后获取数据
document.addEventListener('DOMContentLoaded', fetchMessages);
