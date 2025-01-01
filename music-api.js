// 网易云音乐API基础URL
const baseUrl = 'https://netease-cloud-music-api-phi-eight.vercel.app';

// 获取歌曲详情
async function getSongDetail(id) {
    try {
        const response = await fetch(`${baseUrl}/song/detail?ids=${id}`);
        return await response.json();
    } catch (error) {
        console.error('获取歌曲详情失败:', error);
        return null;
    }
}

// 获取歌曲URL
async function getSongUrl(id) {
    try {
        const response = await fetch(`${baseUrl}/song/url?id=${id}`);
        return await response.json();
    } catch (error) {
        console.error('获取歌曲URL失败:', error);
        return null;
    }
}

// 搜索歌曲
async function searchSongs(keyword) {
    try {
        const response = await fetch(`${baseUrl}/search?keywords=${encodeURIComponent(keyword)}`);
        return await response.json();
    } catch (error) {
        console.error('搜索歌曲失败:', error);
        return null;
    }
}

// 获取歌单详情
async function getPlaylist(id) {
    try {
        const response = await fetch(`${baseUrl}/playlist/detail?id=${id}`);
        return await response.json();
    } catch (error) {
        console.error('获取歌单失败:', error);
        return null;
    }
} 