import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google OAuth profile received:", {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
        });

        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log("Existing user found:", user.name);
          return done(null, user);
        }

        // Create new user if doesn't exist
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0]?.value,
        });

        await user.save();
        console.log("New user created:", user.name);
        return done(null, user);
      } catch (error) {
        console.error("Error in Google OAuth strategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
