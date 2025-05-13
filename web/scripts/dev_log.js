//加载动画
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
//tr进入动画
function animateTableRows() {
    const rows = document.querySelectorAll('#userTable tbody tr');
    rows.forEach((row, index) => {
        // 为每个行添加淡入动画类
        row.classList.add('userTableFadeIn');
        
        const delay = (index+1) * 0.15;
        // 根据行的索引设置动画延迟
        row.style.animationDelay = `${delay}s`;
        
    });
}

window.addEventListener('load',()=>{
        loading.out();
})

//提交留言表单
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 获取表单数据
    var formData = new FormData(this);

    // 发送AJAX请求
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './web/api/dev_log/dev_log_submit.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('日志提交成功！');
            // 清空表单
            document.getElementById('message-form').reset();
            fetchMessages(); // 重新加载
        } else {
            alert('日志提交失败，请稍后再试。');
        }
    };
    xhr.send(formData);
});

//加载日志名单
function fetchMessages() {
    fetch('./../../api/dev_log/dev_log_fetch.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            const table = document.getElementById('userTable');
            data.forEach(user => {
                const row = table.insertRow();
                const idCell = row.insertCell();
                const nameCell = row.insertCell();
                idCell.textContent = user.id;
                nameCell.textContent = user.num;
            });
            animateTableRows();//获取数据成功后，执行动画
        }
    })
    .catch(error => console.error('Error:', error));
}

// 页面加载完成后获取数据
document.addEventListener('DOMContentLoaded', fetchMessages);