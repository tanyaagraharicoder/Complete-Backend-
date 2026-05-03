const musicModel = require('../models/music.model');

const uploadFile = require('../services/storage.service');

const jwt = require('jsonwebtoken');

async function createMusic(req, res) {

    try {

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: "Forbidden: Only artists can create music" });
        }

        const { title } = req.body;
        const file = req.file;

        // ✅ validation
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!file) {
            return res.status(400).json({ message: "Music file is required" });
        }

        // optional: check file type
        if (!file.mimetype.startsWith("audio/")) {
            return res.status(400).json({ message: "Only audio files are allowed" });
        }

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
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

    } catch (error) {
        console.error(error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }

}

module.exports = { createMusic };