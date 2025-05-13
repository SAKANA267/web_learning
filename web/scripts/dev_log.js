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

// 使用AJAX请求获取数据
fetch('./../../api/3c3u_high_way/3c3u_high_way.php')
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
