// AI聊天功能
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    
    // 预设的回复
    const responses = {
        '你好': '你好！我是AI助手，很高兴为你服务。',
        '早上好': '早上好！祝你今天心情愉快！',
        '晚上好': '晚上好！今天过得怎么样？',
        '再见': '再见！祝你有愉快的一天！',
        '谢谢': '不客气！很高兴能帮到你。',
        '名字': '我是一个AI助手，你可以叫我小助手。',
        '你是谁': '我是一个AI助手，可以回答你的问题和帮助你解决问题。',
        '天气': '抱歉，我还不能查询天气信息。不过我建议你看看天气预报APP。',
        '帮助': '我可以回答一些基本问题，陪你聊天。有什么我可以帮你的吗？',
        'default': '我明白了。让我想想怎么帮你解决这个问题。'
    };

    // 添加消息到聊天界面
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 生成AI回复
    function generateResponse(message) {
        // 转换为小写以进行匹配
        const lowerMessage = message.toLowerCase();
        
        // 检查是否包含预设关键词
        for (const key in responses) {
            if (lowerMessage.includes(key.toLowerCase())) {
                return responses[key];
            }
        }
        
        // 如果没有匹配的关键词，返回默认回复
        return responses.default;
    }

    // 处理用户消息
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // 显示用户消息
        addMessage(message, true);
        userInput.value = '';

        // 生成并显示AI回复
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response);
        }, 500); // 添加短暂延迟，模拟思考时间
    }

    // 事件监听器
    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // 添加欢迎消息
    addMessage('你好！我是AI助手，很高兴为你服务。');
}); 