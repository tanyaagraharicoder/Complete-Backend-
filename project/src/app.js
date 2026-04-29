const express = require('express');
const multer = require('multer');
const uploadFile = require('../services/storage.service'); // FIXED PATH
const postModel = require("./models/post.model"); // Import the post model for database operations
const app = express();

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/create-post', upload.single('image'), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer);
    console.log("ImageKit result:", result);

    if (!result.url) {
      return res.status(400).json({
        error: "Image upload failed"
      });
    }

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/posts", async (req, res) => {
    const posts = await postModel.find(); // Retrieve all posts from the database using the post model
    res.status(200).json({
        message: "Posts retrieved successfully",
        posts
    });

})

module.exports = app;