const Logrequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} request made on ${req.originalUrl}`
  );
  next();
};
module.exports = { Logrequest };
