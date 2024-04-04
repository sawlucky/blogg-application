const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const oauthSchema = require("../models/oauth");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1027732035684-fed7be44bfdufb2phk481nrra1f97hn2.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      const User = await oauthSchema.findOne({ googleID: profile.id });
      if (!User) {
        const newUser = new oauthSchema({
          googleID: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        });
        await newUser.save();
        console.log("new user created");
      } else {
        console.log("user already exists");
        console.log(User);
      }

      cb(null, profile);
    }
  )
);
passport.serializeUser((user, cb) => {
  //   console.log(user.id + "this is ueer yess");

  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  //   console.log(obj);
  console.log("yess i got the user");
  cb(null, obj);
});
