const jwt = require("jsonwebtoken");
const secret = "123456";
const genreatToken = (payload) => {
  return jwt.sign(payload, secret);
};
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    if (!authorization) return res.render("/");
    const token = authorization.split(" ")[1];
    if (!token) return res.send({ error: "token not found" });
    const decode = jwt.verify(token, secret);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      message: "internal server error",
    });
  }
};
module.exports = { genreatToken, jwtAuthMiddleware };
