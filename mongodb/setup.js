const mongoose = require("mongoose");
const HandleMOngoDb = (url) => {
  return mongoose.connect(url);
};
module.exports = { HandleMOngoDb };
