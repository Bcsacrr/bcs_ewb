class Carousel {
    constructor(element) {
        this.carousel = element;
        this.container = element.querySelector('.carousel-container');
        this.slides = element.querySelectorAll('.carousel-slide');
        this.prevButton = element.querySelector('.prev');
        this.nextButton = element.querySelector('.next');
        this.dotsContainer = element.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.slidesCount = this.slides.length;
        
        this.init();
    }
    
    init() {
        // 创建导航点
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        // 添加按钮事件监听
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());
        
        // 自动播放
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.container.style.transform = `translateX(-${index * 100}%)`;
        this.updateDots();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slidesCount) % this.slidesCount;
        this.goToSlide(this.currentIndex);
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slidesCount;
        this.goToSlide(this.currentIndex);
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoPlay() {
        setInterval(() => this.next(), 5000); // 每5秒自动切换
    }
}

// 初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
});

// AI聊天功能
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    
    // 使用配置文件中的API Key初始化API客户端
    const chatAPI = new ChatAPI(CONFIG.API_KEY);
    
    // 存储对话历史
    let messageHistory = [];

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleUserMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // 添加用户消息到界面
        addMessage(message, true);
        userInput.value = '';

        // 添加消息到历史记录
        messageHistory.push({
            role: 'user',
            content: message
        });

        try {
            // 显示加载状态
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message ai-message loading';
            loadingDiv.textContent = '正在思考...';
            chatMessages.appendChild(loadingDiv);

            // 调用API
            const response = await chatAPI.sendMessage(messageHistory);
            
            // 移除加载状态
            chatMessages.removeChild(loadingDiv);

            // 添加AI响应到界面和历史记录
            const aiResponse = response.choices[0].message.content;
            addMessage(aiResponse, false);
            messageHistory.push({
                role: 'assistant',
                content: aiResponse
            });

        } catch (error) {
            console.error('Failed to get AI response:', error);
            addMessage('抱歉，发生了一些错误，请稍后重试。', false);
        }
    }

    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}); 