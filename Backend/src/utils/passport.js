import session from "express-session";
import passport from "passport";
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const passportUtil = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/google/callback",
        scope: ["profile", "email"],
        passReqToCallback: true,
      },
      (request, accessToken, refreshToken, profile, callback) => {
        callback(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default passportUtil;
