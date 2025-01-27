const express = require("express");
const mongoose = require("mongoose");
const { config } = require("./src/config/server.config");
const { route: userRoute } = require("./src/routes/user.routes.js");
// const mongoose = require("./src/config/server.config.js");

console.log("establish");

// mongoose.connection.on("open", () => {
//   console.log("db connected");
// });

mongoose.connect(config.dbUri);

// async function connectToDB() {
//   try {
//     console.log("Establishing a connection");
//     mongoose.connect(config.dbUri);
//     console.log("connected");
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// connectToDB();

const app = express();

app.get("/", (req, res) => {
  res.send("hello World");
});

app.post("/login", (req, res) => {
  res.send({ name: "anus" });
});
app.use("/user", userRoute);

app.listen(8001, () => {
  console.log(`Server listening on port 8001`);
});
