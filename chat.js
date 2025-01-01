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