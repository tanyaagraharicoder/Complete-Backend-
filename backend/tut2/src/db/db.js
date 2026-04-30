const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "Database String  from mongodb"
    );

    console.log("✅ Connected to DB");
  } catch (error) {
    console.log("❌ DB Error:", error.message);
  }
}

module.exports = connectDB;
