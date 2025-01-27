require("dotenv").config();

const config = {
  appPort: process.env.SERVER_APP_PORT,
  dbUri: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
};

module.exports = {
  config,
};

// const mongoose = require("mongoose");

// const url = `mongodb+srv://wm174627:aDJGWScWnDiFQxnv@anuscluster.sul8onh.mongodb.net/?retryWrites=true&w=majority&appName=AnusCluster`;
// mongoose.connect(url);

// module.exports = { mongoose };
