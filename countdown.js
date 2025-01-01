document.addEventListener('DOMContentLoaded', () => {
    const countdownList = document.getElementById('countdownList');
    const addCountdownBtn = document.getElementById('addCountdown');
    
    // 从localStorage加载倒数日
    let countdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
    
    // 创建新倒数日
    function createCountdown() {
        const title = prompt('请输入纪念日标题：');
        if (!title) return;
        
        const date = prompt('请输入日期（格式：YYYY-MM-DD）：');
        if (!date || !isValidDate(date)) {
            alert('请输入有效的日期格式！');
            return;
        }
        
        const countdown = {
            id: Date.now(),
            title,
            date,
            createdAt: new Date().toLocaleString()
        };
        
        countdowns.push(countdown);
        saveCountdowns();
        renderCountdowns();
    }
    
    // 添加编辑功能
    function editCountdown(id) {
        const countdown = countdowns.find(c => c.id === id);
        if (!countdown) return;
        
        const newTitle = prompt('请输入新的标题：', countdown.title);
        if (!newTitle) return;
        
        const newDate = prompt('请输入新的日期（格式：YYYY-MM-DD）：', countdown.date);
        if (!newDate || !isValidDate(newDate)) {
            alert('请输入有效的日期格式！');
            return;
        }
        
        countdown.title = newTitle;
        countdown.date = newDate;
        countdown.lastModified = new Date().toLocaleString();
        
        saveCountdowns();
        renderCountdowns();
    }
    
    // 验证日期格式
    function isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) return false;
        
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }
    
    // 计算天数差
    function calculateDays(dateString) {
        const targetDate = new Date(dateString);
        const today = new Date();
        const diffTime = targetDate - today;
        const diffDays = Math.floor(Math.abs(diffTime) / (1000 * 60 * 60 * 24));
        return {
            days: diffDays,
            isFuture: diffTime > 0
        };
    }
    
    // 删除倒数日
    function deleteCountdown(id) {
        if (confirm('确定要删除这个纪念日吗？')) {
            countdowns = countdowns.filter(countdown => countdown.id !== id);
            saveCountdowns();
            renderCountdowns();
        }
    }
    
    // 保存倒数日
    function saveCountdowns() {
        localStorage.setItem('countdowns', JSON.stringify(countdowns));
    }
    
    // 渲染倒数日列表
    function renderCountdowns() {
        countdownList.innerHTML = countdowns.map(countdown => {
            const { days, isFuture } = calculateDays(countdown.date);
            const daysText = isFuture ? `还有 ${days} 天` : `已经过去 ${days} 天`;
            const cardClass = isFuture ? 'countdown-card future' : 'countdown-card past';
            
            return `
                <div class="${cardClass}" data-id="${countdown.id}">
                    <h3 class="countdown-title">${countdown.title}</h3>
                    <div class="countdown-date">${countdown.date}</div>
                    <div class="countdown-days">
                        ${daysText}
                    </div>
                    <div class="countdown-actions">
                        <button class="countdown-btn" onclick="editCountdown(${countdown.id})" title="编辑">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="countdown-btn" onclick="deleteCountdown(${countdown.id})" title="删除">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    ${countdown.lastModified ? 
                        `<div class="countdown-modified">最后修改: ${countdown.lastModified}</div>` 
                        : ''}
                </div>
            `;
        }).join('');
    }
    
    // 事件监听
    addCountdownBtn.addEventListener('click', createCountdown);
    
    // 将函数添加到全局作用域
    window.editCountdown = editCountdown;
    window.deleteCountdown = deleteCountdown;
    
    // 初始化渲染
    renderCountdowns();
    
    // 定期更新天数
    setInterval(renderCountdowns, 1000 * 60 * 60); // 每小时更新一次
}); 