self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('AI聊天应用安装成功');
});

self.addEventListener('fetch', (event) => {
    // 基础的fetch处理
});
