class Carousel {
    constructor(element) {
        this.carousel = element;
        this.items = element.querySelectorAll('.carousel-item');
        this.prevButton = element.querySelector('.prev');
        this.nextButton = element.querySelector('.next');
        this.indicators = element.querySelector('.carousel-indicators');
        
        this.currentIndex = 0;
        this.itemCount = this.items.length;
        
        this.init();
    }
    
    init() {
        // 显示第一张图片
        this.items[0].classList.add('active');
        
        // 创建指示器
        this.items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goTo(index));
            this.indicators.appendChild(indicator);
        });
        
        // 添加按钮事件
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());
        
        // 自动播放
        setInterval(() => this.next(), 5000);
    }
    
    goTo(index) {
        // 移除当前活动项
        this.items[this.currentIndex].classList.remove('active');
        this.indicators.children[this.currentIndex].classList.remove('active');
        
        // 设置新的活动项
        this.currentIndex = index;
        this.items[this.currentIndex].classList.add('active');
        this.indicators.children[this.currentIndex].classList.add('active');
    }
    
    prev() {
        const index = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.goTo(index);
    }
    
    next() {
        const index = (this.currentIndex + 1) % this.itemCount;
        this.goTo(index);
    }
}

// 初始化所有轮播
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
}); 