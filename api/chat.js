export default async function handler(req, res) {
    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持POST请求' });
    }

    try {
        const { messages } = req.body;
        
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: '消息格式错误' });
        }

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            res.status(200).json({ 
                success: true,
                reply: data.choices[0].message.content 
            });
        } else {
            throw new Error('API返回格式异常');
        }
        
    } catch (error) {
        console.error('API错误:', error);
        res.status(500).json({ 
            success: false,
            error: '服务暂时不可用，请稍后重试' 
        });
    }
}
