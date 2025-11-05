const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL = 'http://localhost:5000/api/auth/google/callback',
  JWT_SECRET = 'change_me',
  JWT_EXPIRES_IN = '7d',
} = process.env;

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID || '',
      clientSecret: GOOGLE_CLIENT_SECRET || '',
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile?.emails?.[0]?.value;
        const name = profile?.displayName || 'Google User';
        if (!email) {
          return done(null, false, { message: 'No email returned from Google' });
        }

        let user = await User.findOne({ where: { email } });
        if (!user) {
          // Create user with verified=true, random password placeholder
          const randomPassword = crypto.randomBytes(16).toString('hex');
          user = await User.create({
            name,
            email,
            password: randomPassword, // not used; regular login compares bcrypt; for Google we rely on JWT
            age: 18,
            section: 'Adult',
            isVerified: true,
            verificationToken: null,
            verificationCode: null,
            verificationCodeExpiresAt: null,
          });
        } else if (!user.isVerified) {
          user.isVerified = true;
          user.verificationToken = null;
          user.verificationCode = null;
          user.verificationCodeExpiresAt = null;
          await user.save();
        }

        const token = generateToken({ id: user.id, email: user.email, name: user.name, section: user.section });
        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;


