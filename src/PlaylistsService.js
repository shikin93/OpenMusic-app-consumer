const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistsongs(userId) {
    const query = {
      text: 'SELECT music.id, music.title, music.performer FROM music LEFT JOIN playlistsongs ON playlistsongs.song_id = music.id LEFT JOIN playlists ON playlists.id = playlistsongs.playlist_id LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id WHERE playlists.owner = $1 OR collaborations.user_id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
