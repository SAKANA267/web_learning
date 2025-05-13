document.addEventListener('DOMContentLoaded', function() {
    const emberContainer = document.getElementById('emberContainer');
    
    // 灰烬形状生成函数
    function createEmberShape() {
        // 随机选择形状类型
        const shapeType = Math.floor(Math.random() * 3);
        const ember = document.createElement('div');
        ember.className = 'ember';
        
        // 随机大小 (2-6px)
        const size = Math.random() * 4;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        
        // 根据形状类型设置不同的样式
        switch(shapeType) {
            case 0: // 圆形
                ember.style.borderRadius = '50%';
                break;
            case 1: // 方形旋转
                ember.style.borderRadius = '2px';
                ember.style.transform = `rotate(${Math.random() * 360}deg)`;
                break;
            case 2: // 不规则形状
                ember.style.borderRadius = `${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}%`;
                break;
        }
        
        // 随机颜色 (橙色到红色的渐变)
        const hue = 10 + Math.floor(Math.random() * 30); // 10-40 (红橙色范围)
        const saturation = 5 + Math.floor(Math.random() * 5); // 80-100%
        const lightness = 10 + Math.floor(Math.random() * 60); // 40-60%
        ember.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // 随机发光效果
        const glowIntensity = Math.random() * 2 + 1;
        ember.style.boxShadow = `0 0 ${glowIntensity}px ${glowIntensity/2}px hsl(${hue}, ${saturation}%, ${lightness+10}%)`;
        
        // 设置初始透明度为可见
        ember.style.opacity = 0.9 + Math.random() * 0.1;
        
        return ember;
    }
    
    // 创建并动画灰烬
    function createEmber() {
        const ember = createEmberShape();
        emberContainer.appendChild(ember);
        
        // 起始位置 (左下角区域)
        const startX = window.innerWidth * (1 + Math.random() * 0.5);
        const startY = window.innerHeight * (1 + Math.random() * 0.3);
        
        // 结束位置 (右上角区域)
        const endX = Math.random() * (window.innerWidth * 0.3);
        const endY = Math.random() * (window.innerHeight * 0.3);
        
        // 动画持续时间 (4-10秒)
        const duration = 4000 + Math.random() * 6000;
        
        // 设置初始位置 - 修正位置计算
        ember.style.left = `${startX}px`;
        ember.style.top = `${startY}px`;
        
        // 应用动画
        setTimeout(() => {
            ember.style.transition = `transform ${duration}ms ease-out, opacity ${duration * 0.8}ms ease-in, left ${duration}ms linear, top ${duration}ms ease-in-out`;
            ember.style.left = `${endX}px`;
            ember.style.top = `${endY}px`;
            ember.style.opacity = '0';
            
            // 动画结束后移除元素
            setTimeout(() => {
                ember.remove();
            }, duration);
        }, 10); // 短暂延迟以确保初始样式已应用
    }
    
    // 定期创建灰烬
    function startEmberEffect() {
        // 初始创建一批灰烬
        for (let i = 0; i < 20; i++) {
            setTimeout(createEmber, Math.random() * 1000);
        }
        
        // 持续创建灰烬
        setInterval(() => {
            // 每次创建1-3个灰烬
            const count = 1 + Math.floor(Math.random() * 3);
            for (let i = 0; i < count; i++) {
                createEmber();
            }
        }, 300); // 每300ms创建一批
    }
    
    // 立即启动效果
    startEmberEffect();
});