document.addEventListener('DOMContentLoaded', () => {
    // 创建烟花效果
    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        document.body.appendChild(firework);

        // 设置烟花初始位置（底部随机位置）
        const startX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
        const startY = window.innerHeight;
        const endX = x;
        const endY = y;

        firework.style.left = startX + 'px';
        firework.style.top = startY + 'px';

        // 创建上升动画，包含水平移动
        const riseAnimation = firework.animate([
            { 
                transform: 'translate(0, 0)',
                opacity: 1 
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY}px)`,
                opacity: 1 
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        });

        // 上升完成后创建随机效果
        riseAnimation.onfinish = () => {
            firework.remove();
            const effects = [createExplosion, createHeart, createPeace];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            randomEffect(endX, endY);
        };
    }

    // 创建爱心效果
    function createHeart(x, y) {
        const colors = ['#ff69b4', '#ff1493', '#ff0000', '#ff69b4'];
        const particleCount = 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 2 + 1;
            particle.style.backgroundColor = color;
            particle.style.width = particle.style.height = `${size}px`;
            particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}`;

            // 创建心形轨迹
            const angle = (i / particleCount) * Math.PI * 2;
            const heartShape = (angle) => ({
                x: 16 * Math.pow(Math.sin(angle), 3),
                y: -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))
            });
            const pos = heartShape(angle);
            const distance = Math.random() * 20 + 30;
            const tx = pos.x * distance / 16;
            const ty = pos.y * distance / 16;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0.5)`,
                    opacity: 0.8,
                    offset: 0.6
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 300,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            }).onfinish = () => particle.remove();
        }
    }

    // 创建比耶手势效果
    function createPeace(x, y) {
        const colors = ['#ffffff', '#ffd700', '#00ffff', '#ff69b4'];
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 2 + 1;
            particle.style.backgroundColor = color;
            particle.style.width = particle.style.height = `${size}px`;
            particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}`;

            // 创建V形轨迹
            const angle = (i / particleCount) * Math.PI;
            const distance = Math.random() * 30 + 20;
            const tx = Math.cos(angle) * distance * (i % 2 ? 1 : -1);
            const ty = -Math.abs(Math.sin(angle) * distance);

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0.5)`,
                    opacity: 0.8,
                    offset: 0.6
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 300,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            }).onfinish = () => particle.remove();
        }
    }

    // 创建爆炸效果
    function createExplosion(x, y) {
        const colors = [
            '#ff0000', '#ffa500', '#ffff00', '#00ff00', 
            '#00ffff', '#0000ff', '#ff00ff', '#ff69b4',
            '#ffffff', '#ffd700', '#00ffff', '#ff1493'
        ];

        const particleLayers = [
            { count: 24, velocity: 1.2, size: 2 },
            { count: 16, velocity: 1.5, size: 1.5 },
            { count: 8, velocity: 0.8, size: 2.5 }
        ];

        particleLayers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                document.body.appendChild(particle);

                const color = colors[Math.floor(Math.random() * colors.length)];
                const glow = Math.random() * 3 + 2;
                particle.style.backgroundColor = color;
                particle.style.width = particle.style.height = `${layer.size}px`;
                particle.style.boxShadow = `0 0 ${glow}px ${glow/2}px ${color}`;

                const angle = (i * (360 / layer.count)) * Math.PI / 180;
                const velocity = layer.velocity * (1 + Math.random() * 0.3);
                const distance = 50 + Math.random() * 30;
                const tx = Math.cos(angle) * distance * velocity;
                const ty = Math.sin(angle) * distance * velocity;

                particle.style.left = x + 'px';
                particle.style.top = y + 'px';

                particle.animate([
                    { 
                        transform: 'translate(0, 0) scale(1)', 
                        opacity: 1,
                        filter: 'brightness(1.5)'
                    },
                    { 
                        transform: `translate(${tx}px, ${ty}px) scale(0.5)`,
                        opacity: 0.8,
                        filter: 'brightness(1.2)',
                        offset: 0.4
                    },
                    { 
                        transform: `translate(${tx * 1.1}px, ${ty * 1.1}px) scale(0)`,
                        opacity: 0,
                        filter: 'brightness(1)'
                    }
                ], {
                    duration: 800 + Math.random() * 300,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    fill: 'forwards'
                }).onfinish = () => particle.remove();
            }
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