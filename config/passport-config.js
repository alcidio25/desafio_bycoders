/**
* Criado por Alcidio Lucas - 30/05/2021
*/

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "774780965758-5n0mjut2dfiaipvaub2a3h7df174ohor.apps.googleusercontent.com",
    clientSecret: "uAmHNtU3f_IhkLahMcYd0WTY",
    callbackURL: "http://localhost:3600/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
  }
));