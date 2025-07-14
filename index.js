require("dotenv").config();
const express = require("express");
require("./db/connection");
const cors = require("cors");
const router = require("./routes/router");

const foodApplicationServer = express();
foodApplicationServer.use(cors());
foodApplicationServer.use(express.json());
foodApplicationServer.use(router);
foodApplicationServer.use("/uploads", express.static("uploads"));

const PORT = 4000;
foodApplicationServer.listen(PORT, () => {
  console.log("server Running in port", PORT);
});
