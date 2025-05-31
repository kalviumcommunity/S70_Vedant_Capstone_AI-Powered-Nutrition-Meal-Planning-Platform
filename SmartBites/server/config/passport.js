import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';

// Only set up Google Strategy if credentials are available
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });
        
        if (user) {
          // Update user's Google-specific info if needed
          user.googleId = profile.id;
          user.name = user.name || profile.displayName;
          user.avatar = user.avatar || profile.photos[0]?.value;
          await user.save();
          return done(null, user);
        }

        // Create new user if doesn't exist
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          googleId: profile.id,
          avatar: profile.photos[0]?.value,
          password: Math.random().toString(36).slice(-8), // Random password for Google users
          emailVerified: true // Since Google verifies emails
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  ));
} else {
  console.log('Google OAuth credentials not found. Google authentication will be disabled.');
}

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