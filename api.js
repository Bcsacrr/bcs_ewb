class ChatAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    }

    // 生成JWT Token
    async generateToken() {
        try {
            const [id, secret] = this.apiKey.split('.');
            const now = Date.now();
            
            const header = {
                alg: 'HS256',
                sign_type: 'SIGN'
            };

            const payload = {
                api_key: id,
                exp: now + 3600000, // 1小时后过期
                timestamp: now
            };

            console.log('Generating token with payload:', payload); // 调试日志

            const token = jwt.sign(payload, secret, { 
                algorithm: 'HS256', 
                header: header 
            });

            console.log('Token generated successfully'); // 调试日志
            return token;

        } catch (error) {
            console.error('Token generation error details:', error); // 详细错误信息
            throw new Error(`Token generation failed: ${error.message}`);
        }
    }

    // 发送消息到API
    async sendMessage(messages) {
        try {
            const token = await this.generateToken();
            console.log('Making API request with token:', token.substring(0, 20) + '...'); // 调试日志

            const requestBody = {
                model: 'glm-4',
                messages: messages
            };
            console.log('Request body:', requestBody); // 调试日志

            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status); // 调试日志

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API error response:', errorText); // 详细错误信息
                throw new Error(`API request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('API response data:', data); // 调试日志
            return data;

        } catch (error) {
            console.error('API request error details:', error); // 详细错误信息
            throw error;
        }
    }
}

// 导出API实例
window.chatAPI = new ChatAPI(CONFIG.API_KEY); 