document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.createElement('div');
    starsContainer.id = 'stars-container';
    document.body.prepend(starsContainer);

    // 监听点击事件
    document.addEventListener('click', (e) => {
        const isCard = e.target.closest('.card');
        const isNavbar = e.target.closest('.navbar');
        const isFooter = e.target.closest('.footer');
        const isButton = e.target.closest('button');
        const isLink = e.target.closest('a');

        if (!isCard && !isNavbar && !isFooter && !isButton && !isLink) {
            createFirework(e.clientX, e.clientY);
        }
    });

    // 创建星星
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #fff;
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: twinkle ${Math.random() * 4 + 2}s infinite;
            opacity: ${Math.random() * 0.7 + 0.3};
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
            pointer-events: none;
        `;
        
        return star;
    }

    // 创建烟花效果
    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';

        const colors = ['#ff0', '#ff3', '#f0f', '#0ff', '#f00'];
        
        for (let i = 0; i < 40; i++) { // 增加粒子数量
            const particle = document.createElement('div');
            particle.className = 'particle';
            const angle = (i / 40) * Math.PI * 2;
            const velocity = 3 + Math.random() * 3; // 降低速度
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const tx = Math.cos(angle) * 100 * velocity;
            const ty = Math.sin(angle) * 100 * velocity;
            
            particle.style.cssText = `
                position: absolute;
                background: ${color};
                box-shadow: 0 0 6px ${color};
                width: 6px;
                height: 6px;
                border-radius: 50%;
                --tx: ${tx}px;
                --ty: ${ty}px;
                animation: particle 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 增加动画时间并使用更平滑的缓动函数 */
            `;

            firework.appendChild(particle);
        }

        document.body.appendChild(firework);
        
        setTimeout(() => {
            document.body.removeChild(firework);
        }, 1500); // 增加元素存在时间
    }

    // 添加星星动画
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
        }
    `;
    document.head.appendChild(styleSheet);

    // 创建星星
    for (let i = 0; i < 1200; i++) {
        starsContainer.appendChild(createStar());
    }
}); 