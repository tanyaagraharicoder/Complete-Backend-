const express = require('express');


const app = express();  // Create an instance of the Express application

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});





app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); // Start the server and listen on port 3000 