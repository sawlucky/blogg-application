const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  profilePic: {
    type: String,
    default: "/images/default.jpg",
  },
},{timestamps: true});
UserSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(person.password, salt);
    person.password = hashpassword;
    next();
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: "internal server error" });
  }
});
module.exports = mongoose.model("User", UserSchema);
