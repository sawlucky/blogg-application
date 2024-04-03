const { genreatToken } = require("../jwt");
const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const HandleSignin = async (req, res) => {
  const body = req.body;
  try {
    const user = new UserSchema(body);
    const response = await user.save();
    const payload = {
      _id: response.id,
    };
    const token = genreatToken(payload);
    res.cookie("token", token);
    res.status(200).redirect("/");
    //   send({ response, token })
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};
const HandleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }
    const user = await UserSchema.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(403).send({ error: "wrong email or password" });
    const payload = {
      _id: user.id,
    };
    const token = genreatToken(payload);
    res.cookie("token", token);
    res.status(200).redirect("/");
    //   json({ user, token });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const HandlePassword = async (req, res) => {
  //   console.log(req.cookies.token);
  const userid = req.user;
  console.log(userid);
  const { oldPassword, newPassword } = req.body;
  try {
    console.log("yaha enter hua");
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .sens({ error: "Old Password and New Password is required." });
    }

    const user = await UserSchema.findById(userid);
    console.log(user);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(403).send({ error: "wrong old password" });
    }

    user.password = newPassword;
    console.log(newPassword);
    await user.save();
    res.status(200).redirect("/");
  } catch (err) {
    console.log("err ho gya");
    return res.status(500).send({ error: "Internal server error" });
    // return res.status(500).send({ error: "Internal server error" });
  }
};

const HandleDelteCookie = async (req, res) => {
  const userid = req.user;

  try {
    const user = await UserSchema.findById(userid);
    if (!user) {
      return res.status(404).redirect("/signup");
    }
    res.clearCookie("token");
    res.status(200).redirect("/");
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
module.exports = {
  HandleSignin,
  HandleLogin,
  HandlePassword,
  HandleDelteCookie,
};
