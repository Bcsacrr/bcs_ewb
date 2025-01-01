document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notesList');
    const addNoteBtn = document.getElementById('addNote');
    const saveNotesBtn = document.getElementById('saveNotes');
    
    // 从localStorage加载笔记
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // 创建新笔记
    function createNote() {
        const note = {
            id: Date.now(),
            title: '新笔记',
            content: '',
            lastModified: new Date().toLocaleString()
        };
        notes.push(note);
        renderNotes();
        saveNotes();
    }
    
    // 保存所有笔记
    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    
    // 删除笔记
    function deleteNote(id) {
        if (confirm('确定要删除这条笔记吗？')) {
            notes = notes.filter(note => note.id !== id);
            saveNotes();
            renderNotes();
        }
    }
    
    // 更新笔记
    function updateNote(id, title, content) {
        const note = notes.find(note => note.id === id);
        if (note) {
            note.title = title;
            note.content = content;
            note.lastModified = new Date().toLocaleString();
            saveNotes();
        }
    }
    
    // 渲染笔记列表
    function renderNotes() {
        notesList.innerHTML = notes.map(note => `
            <div class="note-card" data-id="${note.id}">
                <div class="note-header">
                    <input type="text" class="note-title" value="${note.title}" 
                           oninput="updateNote(${note.id}, this.value, this.closest('.note-card').querySelector('.note-content').value)">
                    <div class="note-actions">
                        <button class="note-btn" onclick="deleteNote(${note.id})" title="删除">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <textarea class="note-content" 
                          oninput="updateNote(${note.id}, this.closest('.note-card').querySelector('.note-title').value, this.value)"
                          placeholder="在这里输入内容...">${note.content}</textarea>
                <div class="note-footer">
                    <span>最后修改: ${note.lastModified}</span>
                </div>
            </div>
        `).join('');
    }
    
    // 事件监听
    addNoteBtn.addEventListener('click', createNote);
    saveNotesBtn.addEventListener('click', saveNotes);
    
    // 将函数添加到全局作用域
    window.deleteNote = deleteNote;
    window.updateNote = updateNote;
    
    // 初始化渲染
    renderNotes();
}); 