const playlist = require("../models/playlist");

// Add a song to the playlist
const addSongToPlaylist = (req, res) => {
  const { title, artist, url } = req.body;
  console.log(req.body);
  const songNew = {
    id: playlist.length + 1,
    title,
    artist,
    url,
    numberOfPlays: 0,
  };

  playlist.push(songNew);

  res.status(201).json({
    message: "The song has been added to the playlist",
    song: songNew,
  });
};

const playSong = (req, res) => {
  const songId = parseInt(req.params.id);

  const song = playlist.find((song) => song.id === songId);

  if (!song) {
    res.status(404).json({ message: "Song not found" });
  } else {
    song.numberOfPlays += 1;
    res.status(200).json({ message: "Playing song", song });
  }
};

const getMostPlayedSongs = (req, res) => {
  if (playlist.every((song) => song.numberOfPlays === 0)) {
    res.status(404).json({ message: "No songs have been played yet" });
  } else {
    const sortedPlaylist = playlist
      .slice()
      .sort((a, b) => b.numberOfPlays - a.numberOfPlays);
    res.status(200).json({ playlist: sortedPlaylist });
  }
};

const updateSong = (req, res) => {
  const songId = parseInt(req.params.id);

  const song = playlist.find((song) => song.id === songId);

  if (!song) {
    res.status(404).json({ message: "Song not found" });
  } else {
    const { title, artist, url } = req.body;

    song.title = title || song.title;
    song.artist = artist || song.artist;
    song.url = url || song.url;

    res.status(200).json({ message: "Song updated successfully", song });
  }
};

const deleteSong = (req, res) => {
  const songId = parseInt(req.params.id);
  const index = playlist.findIndex((song) => song.id === songId);

  if (index === -1) {
    res.status(404).json({ message: "Song not found" });
  } else {
    playlist.splice(index, 1);
    res.status(200).json({ message: "Song deleted successfully" });
  }
};

const getPlaylist = (req, res) => {
  res.status(200).json({ playlist });
};

module.exports = {
  addSongToPlaylist,
  playSong,
  getMostPlayedSongs,
  getPlaylist,
  updateSong,
  deleteSong,
};
