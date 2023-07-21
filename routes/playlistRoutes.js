const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistControllers");

router.get("/", playlistController.getPlaylist);
router.post("/add", playlistController.addSongToPlaylist);
router.get("/mostplayed", playlistController.getMostPlayedSongs);
router.patch("/update/:id", playlistController.updateSong);
router.delete("/delete/:id", playlistController.deleteSong);
router.get("/:id", playlistController.playSong);

module.exports = router;
