const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const { config } = require("./src/config/server.config");
const { route: userRoute } = require("./src/routes/user.routes.js");
const { route: todoRoute } = require("./src/routes/todo.routes.js");
const {
  DB_RETRY_LIMIT,
  DB_RETRY_TIMEOUT,
} = require("./src/constants/constants.js");

let connectionRetries = 0;

async function connectToDB() {
  try {
    console.log("Establishing a connection");
    await mongoose.connect(config.dbUri);
    console.log("Connected");
  } catch (error) {
    if (connectionRetries < DB_RETRY_LIMIT) {
      connectionRetries++;
      setTimeout(async () => {}, DB_RETRY_TIMEOUT);
      console.log(`Reconnecting to DB ${connectionRetries}/${DB_RETRY_LIMIT}`);
      await new Promise((resolve) => setTimeout(resolve, DB_RETRY_TIMEOUT));
      await connectToDB();
    } else {
      process.exit();
    }
  }
}

// async function connectToDB() {
//   try {
//     console.log("Establishing a connection");
//     await mongoose.connect(config.dbUri);
//     console.log("Connected");
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// connectToDB();

const PORT = config.appPort;

const app = express();

let corsOptions = {
  origin: "http://localhost:5173",
  Credential: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
(async () => {
  try {
    await connectToDB();
    app.use(express.json());
    app.use("/user", userRoute);
    app.use("/todo", todoRoute);
    app.get("*", (req, res) => {
      res.send("hello");
    });

    app.listen(PORT, () => {
      console.log(`Server Listing on port ${PORT}`);
    });
  } catch (error) {
    console.log("error", error);
  }
})();
