// server.js ka main kam hai server start karna. Ye file app.js ko import karegi aur waha se server start hoga.

const app = require('./src/app'); // Import the Express application from app.js


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); // Start the server and listen on port 3000