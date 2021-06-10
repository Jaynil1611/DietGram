const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");

const { initializeDBConnection } = require("./db/db.connect");
const { createUser } = require("./utils/createUser");

const { pathNotFoundHandler } = require("./middlewares/pathNotFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

dotenv.config();

initializeDBConnection();

app.get("/", (req, res) => {
  res.json("Welcome to Dietify Quiz");
});

// app.use("/quizzes", quizRouter);

app.use(pathNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
