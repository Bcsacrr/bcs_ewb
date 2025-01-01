document.addEventListener('DOMContentLoaded', async () => {
    const playButton = document.getElementById('playButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const songTitle = document.querySelector('.song-title');
    const artistName = document.querySelector('.artist-name');
    
    // 创建音频对象
    const audio = new Audio();
    let isPlaying = false;
    
    // 音乐播放器状态
    let currentTrackIndex = 0;
    let playlist = [
        { 
            name: '素颜', 
            artist: '许嵩、何曼婷', 
            url: 'music/许嵩、何曼婷 - 素颜.mp3'
        },
        { 
            name: '有何不可', 
            artist: '许嵩', 
            url: 'music/有何不可 - 许嵩.mp3'
        }
    ];
    let shuffledPlaylist = [...playlist];

    // 加载音轨
    async function loadTrack(index) {
        if (index < 0) index = shuffledPlaylist.length - 1;
        if (index >= shuffledPlaylist.length) index = 0;
        
        currentTrackIndex = index;
        const track = shuffledPlaylist[currentTrackIndex];
        
        try {
            audio.src = track.url;
            audio.load();
            updatePlayerInfo();
        } catch (error) {
            console.error('加载音乐失败:', error);
            // 如果加载失败，尝试下一首
            setTimeout(() => nextTrack(), 1000);
        }
    }

    // 更新播放器信息
    function updatePlayerInfo() {
        const track = shuffledPlaylist[currentTrackIndex];
        songTitle.textContent = track.name;
        artistName.textContent = track.artist;
        playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    }

    // 播放/暂停
    async function togglePlay() {
        try {
            if (audio.paused) {
                await audio.play();
                isPlaying = true;
            } else {
                audio.pause();
                isPlaying = false;
            }
            updatePlayerInfo();
        } catch (error) {
            console.error('播放失败:', error);
            isPlaying = false;
            updatePlayerInfo();
            // 如果当前歌曲播放失败，尝试播放下一首
            nextTrack();
        }
    }

    // 下一首
    async function nextTrack() {
        await loadTrack(currentTrackIndex + 1);
        if (isPlaying) {
            try {
                await audio.play();
            } catch (error) {
                console.error('播放失败:', error);
                isPlaying = false;
                updatePlayerInfo();
                // 如果播放失败，继续尝试下一首
                setTimeout(() => nextTrack(), 1000);
            }
        }
    }

    // 上一首
    async function prevTrack() {
        await loadTrack(currentTrackIndex - 1);
        if (isPlaying) {
            try {
                await audio.play();
            } catch (error) {
                console.error('播放失败:', error);
                isPlaying = false;
                updatePlayerInfo();
                // 如果播放失败，尝试上一首
                setTimeout(() => prevTrack(), 1000);
            }
        }
    }

    // 设置音量
    function setVolume(value) {
        audio.volume = value;
    }

    // 当前歌曲播放结束时自动播放下一首
    audio.addEventListener('ended', () => {
        nextTrack();
    });

    // 音频错误处理
    audio.addEventListener('error', (e) => {
        console.error('音频加载错误:', e);
        isPlaying = false;
        updatePlayerInfo();
        // 如果当前歌曲加载失败，延迟一秒后尝试播放下一首
        setTimeout(() => nextTrack(), 1000);
    });

    // 事件监听
    playButton.addEventListener('click', togglePlay);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    volumeSlider.addEventListener('input', () => {
        setVolume(volumeSlider.value / 100);
    });

    // 初始化播放器
    loadTrack(0);
}); 