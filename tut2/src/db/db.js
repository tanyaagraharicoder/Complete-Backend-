const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb://yt:<Password>X@ac-f7xof4i-shard-00-00.d5z3jne.mongodb.net:27017,ac-f7xof4i-shard-00-01.d5z3jne.mongodb.net:27017,ac-f7xof4i-shard-00-02.d5z3jne.mongodb.net:27017/tanya?ssl=true&replicaSet=atlas-p8acpu-shard-0&authSource=admin&retryWrites=true&w=majority"
    );

    console.log("✅ Connected to DB");
  } catch (error) {
    console.log("❌ DB Error:", error.message);
  }
}

module.exports = connectDB;
