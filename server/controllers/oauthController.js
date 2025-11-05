const express = require('express');
const passport = require('passport');

const router = express.Router();

const { FRONTEND_BASE_URL = 'http://localhost:3000' } = process.env;

// Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login?error=oauth' }),
  (req, res) => {
    // passport strategy returns { user, token }
    const auth = req.user || {};
    const token = auth.token;
    const redirectUrl = `${FRONTEND_BASE_URL}/oauth/callback?token=${encodeURIComponent(token || '')}`;
    return res.redirect(302, redirectUrl);
  }
);

module.exports = router;


