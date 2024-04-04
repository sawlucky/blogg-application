const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const status = require("express-status-monitor");
const session = require("express-session");
const passport = require("passport");
const app = express();

// auth
const services = require("./services/googleAuth");
app.use(status());
app.use(bodyParser.json());
//engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/user");
///if any form data comes so we will use urlencoded to parse it
app.use(
  session({
    secret: "secret", //unique id bnane ke lia it secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/auth", authRouter);
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
