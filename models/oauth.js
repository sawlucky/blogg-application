const mongoose = require("mongoose");
const oauthSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  googleID: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});
module.exports = mongoose.model("Auth", oauthSchema);
