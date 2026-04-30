require('dotenv').config(); // Load environment variables from the .env file

const app = require('./src/app'); // Import the Express application from the app.js file in the src directory


const connectDB = require('./src/db/db'); // Import the connectDB function from the db.js file in the src/db directory
connectDB();



// Call the connectDB function to establish a connection to the MongoDB database
app.listen(3000, ()=>{
    console.log('Server is running on port 3000'); // Start the server and listen on port 3000, logging a message to the console when it starts
})