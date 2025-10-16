const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('../models/Students');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Student.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,       // Get from Google Cloud Console
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if student already exists
      const existingStudent = await Student.findOne({ googleId: profile.id });
      if (existingStudent) {
        return done(null, existingStudent);
      }

      // If not, create new student
      const newStudent = await Student.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        username: profile.emails[0].value.split('@')[0], // Example username
        stdid: `SID${Date.now()}`,
        walletid: `WID${Math.floor(1000 + Math.random() * 9000)}`,
        password: 'user123', // no password needed for Google login,
        grade: 10,
      });

      done(null, newStudent);
    } catch (err) {
      done(err, null);
    }
  }
));
