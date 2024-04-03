const HandlePassword = async (req, res) => {
  const email = req.cookies.email;  
  console.log(email);
  // console.log(req.cookies.email);
  // const userid = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    console.log("yaha enter hua");
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .sens({ error: "Old Password and New Password is required." });
    }

    const user = await UserSchema.findOne({ email: email });
    console.log("user is", user);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      console.log("cant find user", user.password);
      return res.status(403).send({ error: "wrong old password" });
    }

    user.password = newPassword;
    console.log(newPassword);
    await user.save();
    res.status(200).send({ message: "Password changed successfully" });
  } catch (err) {
    console.log("err ho gya");
    return res.status(500).send({ error: "Internal ser" });
  }
};
