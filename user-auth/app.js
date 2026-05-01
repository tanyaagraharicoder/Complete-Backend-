const express = require('express');

const authRoutes = require('./src/routes/auth.routes'); // Import authentication routes
const postRoutes = require('./src/routes/post.routes'); // Import post routes

const cookieParser = require('cookie-parser'); // Import cookie-parser middleware to handle cookies

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use('/api/auth', authRoutes); // Use the authentication routes with the base path /api/auth
app.use('/api/posts', postRoutes); // Use the post routes with the base path /api/posts

module.exports = app;


