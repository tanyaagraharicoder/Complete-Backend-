const Music = require('../models/music.model');
const { uploadFile } = require('../services/storage.service');
const Album = require('../models/album.model');
const { verify } = require('jsonwebtoken');
const musicModel = require('../models/music.model');


async function createMusic(req, res) {

   
        const { title } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!file) {
            return res.status(400).json({ message: "Music file is required" });
        }

        if (!file.mimetype.startsWith("audio/")) {
            return res.status(400).json({ message: "Only audio files are allowed" });
        }

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await Music.create({
            uri: result.url,
            title,
            artist: req.user.id
        });

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                title: music.title,
                uri: music.uri,
                artist: music.artist
            }
        });

    } 




async function createAlbum(req, res) {



    

        const { title, musicIds } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!musicIds || !Array.isArray(musicIds)) {
            return res.status(400).json({ message: "musicIds must be an array" });
        }

        const album = await Album.create({
            title,
            artist: req.user.id,
            musics: musicIds
        });

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });

    } 

async function getAllMusics(req, res) {
  try {
    const musics = await musicModel
      .find()
      .populate("artist", "name");

    res.status(200).json({
      message: "Musics retrieved successfully",
      musics: musics,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching musics",
      error: error.message,
    });
  }
}

async function getAllAlbums(req, res) {
  try {
    const albums = await Album
      .find()
      .select("title artist musics") // include musics
      .populate("artist", "name email") // match schema
      .populate("musics"); // must match schema field

    res.status(200).json({
      message: "Album fetched successfully",
      albums,
    });

  } catch (error) {
    console.log(error); // 👈 important for debugging
    res.status(500).json({
      message: "Error fetching albums",
      error: error.message,
    });
  }
}

module.exports = { createMusic, createAlbum, getAllMusics , getAllAlbums};