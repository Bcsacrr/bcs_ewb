document.addEventListener('DOMContentLoaded', () => {
    // 创建烟花效果
    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        document.body.appendChild(firework);

        const startX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
        const startY = window.innerHeight;
        const endY = y;

        firework.style.left = startX + 'px';
        firework.style.top = startY + 'px';

        const animation = firework.animate([
            { transform: `translate(0, 0)` },
            { transform: `translate(${x - startX}px, ${endY - startY}px)` }
        ], {
            duration: 600,
            easing: 'ease-out'
        });

        animation.onfinish = () => {
            firework.remove();
            // 随机选择效果
            const effects = [createExplosion, createHeart, createBCS, createHMM];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            randomEffect(x, endY);
        };
    }

    // 创建BCS字母效果
    function createBCS(x, y) {
        const colors = ['#ff0', '#f0f', '#0ff', '#fff'];
        const letters = [
            // B的点阵（优化形状）
            [[0,0], [0,1], [0,2], [0,3], 
             [1,0], [1,2], [1,3],
             [2,0], [2,1], [2,2], [2,3],
             [3,0], [3,2], [3,3],
             [4,0], [4,1], [4,2], [4,3]],
            // C的点阵（优化形状）
            [[0,1], [0,2], [0,3],
             [1,0], [1,1],
             [2,0],
             [3,0], [3,1],
             [4,1], [4,2], [4,3]],
            // S的点阵（优化形状）
            [[0,1], [0,2], [0,3],
             [1,0], [1,1],
             [2,1], [2,2],
             [3,2], [3,3],
             [4,0], [4,1], [4,2]]
        ];
        
        let offsetX = -150; // 调整起始位置
        
        letters.forEach((letter, letterIndex) => {
            letter.forEach(([row, col]) => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                document.body.appendChild(particle);

                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = 6; // 减小粒子大小，使字母更清晰
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.backgroundColor = color;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.boxShadow = `0 0 ${size}px ${size/2}px ${color}`; // 减小发光效果

                const tx = offsetX + col * 12; // 减小间距
                const ty = row * 12 - 40; // 减小间距

                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 1, offset: 0.3 },
                    { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 1, offset: 0.8 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            });
            offsetX += 60; // 减小字母间距
        });
    }

    // 创建爱心效果
    function createHeart(x, y) {
        const colors = ['#ff69b4', '#ff1493', '#ff0000', '#ff69b4'];
        const particleCount = 80; // 增加粒子数量使形状更圆润
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 3 + 2;
            particle.style.backgroundColor = color;
            particle.style.width = particle.style.height = `${size}px`;
            particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}`;

            const angle = (i / particleCount) * Math.PI * 2;
            // 优化爱心形状的参数方程
            const heartShape = (angle) => ({
                x: 16 * Math.pow(Math.sin(angle), 3),
                y: -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * 1.2
            });
            const pos = heartShape(angle);
            
            // 添加随机偏移使边缘更自然
            const randomOffset = Math.random() * 5 - 2.5;
            const distance = Math.random() * 40 + 80; // 增大基础扩散范围
            const tx = (pos.x * distance / 16) + randomOffset;
            const ty = (pos.y * distance / 16) + randomOffset;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx * 0.3}px, ${ty * 0.3}px) scale(1)`, opacity: 1, offset: 0.2 },
                { transform: `translate(${tx}px, ${ty}px) scale(0.5)`, opacity: 0.8, offset: 0.7 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    // 创建爆炸效果
    function createExplosion(x, y) {
        const colors = ['#ff0', '#f0f', '#0ff', '#fff'];
        const particles = 50;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 3 + 2;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.boxShadow = `0 0 ${size}px ${size/2}px ${color}`;

            const angle = (i / particles) * 360;
            const velocity = 2 + Math.random() * 2;
            const tx = Math.cos(angle * Math.PI / 180) * velocity * 50;
            const ty = Math.sin(angle * Math.PI / 180) * velocity * 50;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    // 创建HMM字母效果（字母逆时针旋转180度）
    function createHMM(x, y) {
        const colors = ['#ff0', '#f0f', '#0ff', '#fff'];
        const letters = [
            // H的点阵（逆时针旋转180度）
            [[0,3], [1,3], [2,3], [3,3], [4,3],
             [2,2],
             [2,1],
             [0,0], [1,0], [2,0], [3,0], [4,0]],
            // M的点阵（逆时针旋转180度，优化形状）
            [[0,4], [1,4], [2,4], [3,4], [4,4],
             [1,3], [3,3],
             [2,2],
             [1,1], [3,1],
             [0,0], [1,0], [2,0], [3,0], [4,0]],
            // M的点阵（第二个，逆时针旋转180度，优化形状）
            [[0,4], [1,4], [2,4], [3,4], [4,4],
             [1,3], [3,3],
             [2,2],
             [1,1], [3,1],
             [0,0], [1,0], [2,0], [3,0], [4,0]]
        ];
        
        let offsetX = -120; // 水平方向的起始位置，确保居中
        
        letters.forEach((letter, letterIndex) => {
            letter.forEach(([row, col]) => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                document.body.appendChild(particle);

                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = 6; // 保持字母清晰度
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.backgroundColor = color;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.boxShadow = `0 0 ${size}px ${size/2}px ${color}`;

                // 水平排列，字母上下颠倒
                const tx = offsetX + col * 12; // x方向偏移
                const ty = row * 12 - 30; // y方向偏移，稍微向上偏移以居中

                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 1, offset: 0.3 },
                    { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 1, offset: 0.8 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            });
            offsetX += 80; // 增加字母间距，因为旋转后字母变宽了
        });
    }

    // 监听点击事件
    document.addEventListener('click', (e) => {
        const interactiveElements = e.target.closest('button, input, a, .nav-links, .music-player, .chat-input, .notebook-controls, .countdown-controls, .social-links');
        
        if (!interactiveElements) {
            createFirework(e.clientX, e.clientY);
        }
    });
}); 