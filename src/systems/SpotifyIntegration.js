/**
 * Spotify Integration for Singapore Streets
 * Play music from Spotify in-game
 */

export class SpotifyIntegration {
    constructor(game) {
        this.game = game;
        this.player = null;
        this.deviceId = null;
        this.accessToken = null;
        this.isPlaying = false;
        this.currentTrack = null;
        this.playlists = [];
        
        this.setupUI();
        this.loadSpotifySDK();
    }
    
    setupUI() {
        // Spotify player UI
        this.ui = document.createElement('div');
        this.ui.id = 'spotify-ui';
        this.ui.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 400px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #1DB954;
            border-radius: 12px;
            padding: 15px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `;
        document.body.appendChild(this.ui);
    }
    
    loadSpotifySDK() {
        // Load Spotify Web Playback SDK
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
        
        window.onSpotifyWebPlaybackSDKReady = () => {
            this.initializePlayer();
        };
    }
    
    async initializePlayer() {
        // Get access token (would need OAuth in production)
        // For now, use a placeholder
        this.accessToken = localStorage.getItem('spotify_access_token');
        
        if (!this.accessToken) {
            this.showLoginPrompt();
            return;
        }
        
        const player = new Spotify.Player({
            name: 'Singapore Streets Radio',
            getOAuthToken: cb => { cb(this.accessToken); },
            volume: 0.5
        });
        
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Spotify player ready:', device_id);
            this.deviceId = device_id;
            this.player = player;
            this.showPlayerUI();
        });
        
        // Not ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline:', device_id);
        });
        
        // Player state changed
        player.addListener('player_state_changed', (state) => {
            if (!state) return;
            this.currentTrack = state.track_window.current_track;
            this.isPlaying = !state.paused;
            this.updatePlayerUI();
        });
        
        // Connect
        await player.connect();
    }
    
    showLoginPrompt() {
        this.ui.style.display = 'block';
        this.ui.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 10px;">🎵</div>
                <div style="font-weight: bold; margin-bottom: 15px; color: #1DB954;">Spotify Integration</div>
                <div style="margin-bottom: 15px; color: #888;">
                    Connect your Spotify account to play music in-game.
                    <br>Requires Spotify Premium.
                </div>
                <button onclick="window.game.spotify.connect()" style="
                    padding: 10px 20px;
                    background: #1DB954;
                    color: #fff;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                ">Connect Spotify</button>
            </div>
        `;
    }
    
    connect() {
        // OAuth flow (simplified - would need proper OAuth in production)
        const clientId = 'your_spotify_client_id';
        const redirectUri = window.location.origin;
        const scopes = 'streaming user-read-email user-read-private user-modify-playback-state';
        
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    }
    
    showPlayerUI() {
        this.ui.style.display = 'block';
        this.updatePlayerUI();
    }
    
    updatePlayerUI() {
        if (!this.currentTrack) return;
        
        const track = this.currentTrack;
        const artists = track.artists.map(a => a.name).join(', ');
        
        this.ui.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="${track.album.images[0]?.url || ''}" style="width: 60px; height: 60px; border-radius: 4px;">
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: #1DB954;">${track.name}</div>
                    <div style="font-size: 11px; color: #888;">${artists}</div>
                    <div style="font-size: 10px; color: #666;">${track.album.name}</div>
                </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 10px; justify-content: center;">
                <button onclick="window.game.spotify.previous()" style="padding: 5px 15px; background: #333; color: #fff; border: none; border-radius: 4px; cursor: pointer;">⏮</button>
                <button onclick="window.game.spotify.togglePlay()" style="padding: 5px 20px; background: #1DB954; color: #fff; border: none; border-radius: 4px; cursor: pointer;">${this.isPlaying ? '⏸' : '▶'}</button>
                <button onclick="window.game.spotify.next()" style="padding: 5px 15px; background: #333; color: #fff; border: none; border-radius: 4px; cursor: pointer;">⏭</button>
            </div>
            <div style="margin-top: 10px; text-align: center; font-size: 10px; color: #666;">
                Spotify Connected • Press S to toggle
            </div>
        `;
    }
    
    togglePlay() {
        if (this.player) {
            this.player.togglePlay();
        }
    }
    
    next() {
        if (this.player) {
            this.player.nextTrack();
        }
    }
    
    previous() {
        if (this.player) {
            this.player.previousTrack();
        }
    }
    
    toggleUI() {
        this.ui.style.display = this.ui.style.display === 'none' ? 'block' : 'none';
    }
    
    // Play a specific track/playlist
    async playTrack(uri) {
        if (!this.deviceId || !this.accessToken) return;
        
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: [uri] })
        });
    }
    
    async playPlaylist(playlistId) {
        if (!this.deviceId || !this.accessToken) return;
        
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ context_uri: `spotify:playlist:${playlistId}` })
        });
    }
    
    update(delta) {
        // Update player state if needed
    }
}

// Make globally accessible
if (typeof window !== 'undefined') {
    window.SpotifyIntegration = SpotifyIntegration;
}
