// 默认的快捷访问项
const defaultQuickAccess = [
    { name: 'GitHub', url: 'https://www.github.com', icon: 'https://github.githubassets.com/favicons/favicon.svg' },
    { name: 'Google', url: 'https://www.google.com', icon: 'https://www.google.com/favicon.ico' },
    { name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'https://www.bilibili.com/favicon.ico' },
    { name: '知乎', url: 'https://www.zhihu.com', icon: 'https://static.zhihu.com/heifetz/favicon.ico' },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: 'https://www.youtube.com/favicon.ico' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'https://chat.openai.com/favicon.ico' }
];

// 从localStorage加载快捷访问项
function loadQuickAccess() {
    const saved = localStorage.getItem('quickAccess');
    return saved ? JSON.parse(saved) : defaultQuickAccess;
}

// 保存快捷访问项到localStorage
function saveQuickAccess(items) {
    localStorage.setItem('quickAccess', JSON.stringify(items));
}

// 渲染快捷访问栏
function renderQuickAccess() {
    const quickAccessBar = document.querySelector('.quick-access-bar');
    const items = loadQuickAccess();
    
    quickAccessBar.innerHTML = '';
    
    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'quick-access-item';
        itemElement.innerHTML = `
            <a href="${item.url}" class="quick-access-link" target="_blank" rel="noopener noreferrer">
                <img src="${item.icon}" alt="${item.name}" onerror="this.src='https://www.google.com/favicon.ico'">
                <span>${item.name}</span>
            </a>
            <div class="quick-access-actions">
                <button class="edit-btn" onclick="editQuickAccess(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteQuickAccess(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        quickAccessBar.appendChild(itemElement);
    });

    // 添加"添加新站点"按钮
    const addButton = document.createElement('div');
    addButton.className = 'quick-access-item add-new';
    addButton.innerHTML = `
        <button onclick="addQuickAccess()">
            <i class="fas fa-plus"></i>
            <span>添加新站点</span>
        </button>
    `;
    quickAccessBar.appendChild(addButton);
}

// 获取网站图标URL
function getFaviconUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}`;
    } catch {
        return 'https://www.google.com/favicon.ico';
    }
}

// 编辑快捷访问项
function editQuickAccess(index) {
    const items = loadQuickAccess();
    const item = items[index];
    
    // 创建弹窗
    const dialog = document.createElement('div');
    dialog.className = 'quick-access-dialog';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>编辑快捷访问</h3>
            <div class="dialog-form">
                <div class="form-group">
                    <label for="siteName">网站名称：</label>
                    <input type="text" id="siteName" value="${item.name}" placeholder="请输入网站名称">
                </div>
                <div class="form-group">
                    <label for="siteUrl">网站地址：</label>
                    <input type="text" id="siteUrl" value="${item.url}" placeholder="请输入网址">
                </div>
                <div class="form-group">
                    <label>网站图标预览：</label>
                    <div class="icon-preview">
                        <img id="iconPreview" src="${item.icon}" alt="图标预览">
                    </div>
                </div>
            </div>
            <div class="dialog-buttons">
                <button class="cancel-btn">取消</button>
                <button class="save-btn">保存</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .quick-access-dialog {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .dialog-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            width: 90%;
            max-width: 400px;
        }
        
        .dialog-content h3 {
            margin-bottom: 1.5rem;
            color: var(--primary-color);
            text-align: center;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #666;
        }
        
        .form-group input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
        }
        
        .form-group input:focus {
            border-color: var(--secondary-color);
            outline: none;
            box-shadow: 0 0 0 2px rgba(9, 132, 227, 0.1);
        }

        .icon-preview {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: #f8f9fa;
        }

        .icon-preview img {
            width: 32px;
            height: 32px;
            object-fit: contain;
        }
        
        .dialog-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .dialog-buttons button {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .cancel-btn {
            background: #f1f1f1;
            color: #666;
        }
        
        .save-btn {
            background: var(--secondary-color);
            color: white;
        }
        
        .cancel-btn:hover {
            background: #e1e1e1;
        }
        
        .save-btn:hover {
            background: var(--accent-color);
        }
    `;
    document.head.appendChild(style);
    
    // 绑定事件
    const cancelBtn = dialog.querySelector('.cancel-btn');
    const saveBtn = dialog.querySelector('.save-btn');
    const urlInput = dialog.querySelector('#siteUrl');
    const iconPreview = dialog.querySelector('#iconPreview');
    
    // 当URL输入框值改变时，自动更新图标预览
    urlInput.addEventListener('input', () => {
        const url = urlInput.value.trim();
        if (url) {
            iconPreview.src = getFaviconUrl(url);
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
    
    saveBtn.addEventListener('click', () => {
        const name = dialog.querySelector('#siteName').value.trim();
        const url = urlInput.value.trim();
        
        if (!name || !url) {
            alert('请填写网站名称和网址！');
            return;
        }
        
        items[index] = { 
            name, 
            url, 
            icon: getFaviconUrl(url)
        };
        saveQuickAccess(items);
        renderQuickAccess();
        document.body.removeChild(dialog);
    });
}

// 删除快捷访问项
function deleteQuickAccess(index) {
    if (!confirm('确定要删除这个快捷方式吗？')) return;
    
    const items = loadQuickAccess();
    items.splice(index, 1);
    saveQuickAccess(items);
    renderQuickAccess();
}

// 添加新的快捷访问项
function addQuickAccess() {
    // 创建弹窗
    const dialog = document.createElement('div');
    dialog.className = 'quick-access-dialog';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>添加新站点</h3>
            <div class="dialog-form">
                <div class="form-group">
                    <label for="siteName">网站名称：</label>
                    <input type="text" id="siteName" placeholder="请输入网站名称">
                </div>
                <div class="form-group">
                    <label for="siteUrl">网站地址：</label>
                    <input type="text" id="siteUrl" placeholder="请输入网址">
                </div>
                <div class="form-group">
                    <label>网站图标预览：</label>
                    <div class="icon-preview">
                        <img id="iconPreview" src="https://www.google.com/favicon.ico" alt="图标预览">
                    </div>
                </div>
            </div>
            <div class="dialog-buttons">
                <button class="cancel-btn">取消</button>
                <button class="save-btn">保存</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // 绑定事件
    const cancelBtn = dialog.querySelector('.cancel-btn');
    const saveBtn = dialog.querySelector('.save-btn');
    const urlInput = dialog.querySelector('#siteUrl');
    const iconPreview = dialog.querySelector('#iconPreview');
    
    // 当URL输入框值改变时，自动更新图标预览
    urlInput.addEventListener('input', () => {
        const url = urlInput.value.trim();
        if (url) {
            iconPreview.src = getFaviconUrl(url);
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
    
    saveBtn.addEventListener('click', () => {
        const name = dialog.querySelector('#siteName').value.trim();
        const url = urlInput.value.trim();
        
        if (!name || !url) {
            alert('请填写网站名称和网址！');
            return;
        }
        
        const items = loadQuickAccess();
        items.push({ 
            name, 
            url, 
            icon: getFaviconUrl(url)
        });
        saveQuickAccess(items);
        renderQuickAccess();
        document.body.removeChild(dialog);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    renderQuickAccess();
}); 