const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");

const { initializeDBConnection } = require("./db/db.connect");
const userRouter = require("./routes/user.router");
const loginRouter = require("./routes/login.router");
const postRouter = require("./routes/post.router");
const notificationRouter = require("./routes/notification.router");
const bookmarkRouter = require("./routes/bookmar.router");

const { pathNotFoundHandler } = require("./middlewares/pathNotFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

dotenv.config();

initializeDBConnection();

app.get("/", (req, res) => {
  res.json("Welcome to Diet Gram");
});

app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/notifications", notificationRouter);
app.use("/bookmarks", bookmarkRouter);

app.use(pathNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
