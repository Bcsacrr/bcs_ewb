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
    
    // 默认歌单ID（热门华语歌单）
    const defaultPlaylistId = '3778678';
    
    let playlist = [];
    let currentTrackIndex = 0;
    
    // 初始化播放列表
    async function initializePlaylist() {
        try {
            songTitle.textContent = '正在加载歌单...';
            artistName.textContent = '';
            
            const playlistData = await getPlaylist(defaultPlaylistId);
            console.log('歌单数据:', playlistData);
            
            if (playlistData && playlistData.playlist && playlistData.playlist.tracks) {
                playlist = playlistData.playlist.tracks.map(track => ({
                    id: track.id,
                    title: track.name,
                    artist: track.ar[0].name
                }));
                console.log('处理后的播放列表:', playlist);
                
                // 预加载第一首歌
                await loadTrack(0, false);
                songTitle.textContent = playlist[0].title;
                artistName.textContent = playlist[0].artist;
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                songTitle.textContent = '加载歌单失败';
                artistName.textContent = '请刷新页面重试';
                console.error('歌单数据格式错误:', playlistData);
            }
        } catch (error) {
            console.error('初始化播放列表失败:', error);
            songTitle.textContent = '加载失败';
            artistName.textContent = '请刷新页面重试';
        }
    }
    
    // 播放/暂停功能
    async function togglePlay() {
        try {
            if (isPlaying) {
                audio.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                await audio.play();
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        } catch (error) {
            console.error('播放控制失败:', error);
            isPlaying = false;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    // 加载并播放歌曲
    async function loadTrack(index, autoplay = true) {
        try {
            if (index < 0) index = playlist.length - 1;
            if (index >= playlist.length) index = 0;
            
            currentTrackIndex = index;
            const track = playlist[currentTrackIndex];
            
            songTitle.textContent = '加载中...';
            artistName.textContent = track.artist;
            
            console.log('加载歌曲:', track);
            
            const urlData = await getSongUrl(track.id);
            console.log('歌曲URL数据:', urlData);
            
            if (urlData && urlData.data && urlData.data[0] && urlData.data[0].url) {
                audio.src = urlData.data[0].url;
                songTitle.textContent = track.title;
                artistName.textContent = track.artist;
                
                if (autoplay && isPlaying) {
                    try {
                        await audio.play();
                    } catch (error) {
                        console.error('播放失败:', error);
                        isPlaying = false;
                        playButton.innerHTML = '<i class="fas fa-play"></i>';
                    }
                }
            } else {
                console.error('获取歌曲URL失败:', urlData);
                songTitle.textContent = '无法播放此歌曲';
                artistName.textContent = '请尝试下一首';
                nextTrack();
            }
        } catch (error) {
            console.error('加载歌曲失败:', error);
            songTitle.textContent = '加载失败';
            artistName.textContent = '请重试';
        }
    }
    
    // 下一首
    function nextTrack() {
        loadTrack(currentTrackIndex + 1);
    }
    
    // 上一首
    function prevTrack() {
        loadTrack(currentTrackIndex - 1);
    }
    
    // 音量控制
    function updateVolume() {
        audio.volume = volumeSlider.value / 100;
    }
    
    // 事件监听
    playButton.addEventListener('click', togglePlay);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    volumeSlider.addEventListener('input', updateVolume);
    
    // 音频结束时自动播放下一首
    audio.addEventListener('ended', nextTrack);
    
    // 音频错误处理
    audio.addEventListener('error', (e) => {
        console.error('音频错误:', e);
        songTitle.textContent = '播放出错';
        artistName.textContent = '请尝试其他歌曲';
        isPlaying = false;
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // 初始化播放列表
    initializePlaylist();
}); 