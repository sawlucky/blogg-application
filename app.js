const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
app.use(bodyParser.json());
//engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
///if any form data comes so we will use urlencoded to parse it
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use("/", indexRouter);
// setting up mongodb:
const { HandleMOngoDb } = require("./mongodb/setup");
HandleMOngoDb("mongodb://127.0.0.1:27017/BLoggApp")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("failed to connect to mongodb"));

const PORT = 8000;

app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
