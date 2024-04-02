const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const { Logrequest } = require("../middleware/logreq");
const { jwtAuthMiddleware } = require("../jwt");
const {
  HandleSignin,
  HandleLogin,
  HandlePassword,
} = require("../controllers/connection");
router.use(Logrequest);
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/forgot", (req, res) => {
  res.render("forgotpass");
});
router.post("/signin", HandleSignin);
router.post("/login", HandleLogin);
router.post("/password", HandlePassword);

module.exports = router;
