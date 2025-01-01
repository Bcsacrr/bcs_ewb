// 添加导航栏滚动效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            // 平滑滚动到目标部分
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            updateActiveLink(link);
        });
    });
    
    // 更新活动链接样式
    function updateActiveLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    // 监听滚动事件，更新活动链接
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.id;
            }
        });
        
        if (currentSection !== '') {
            const activeLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
            if (activeLink) {
                updateActiveLink(activeLink);
            }
        }
    });
}); 