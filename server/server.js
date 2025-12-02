require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Ensure models & associations are loaded before controllers (which may sync)
require('./models');
const authRouter = require('./controllers/authController');
const oauthRouter = require('./controllers/oauthController');
const resultsRouter = require('./controllers/resultsController');
const passport = require('passport');
require('./services/passport');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(passport.initialize());

// Mount the auth routes
app.use('/api/auth', authRouter);
app.use('/api/auth', oauthRouter);
app.use('/api/results', resultsRouter);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// DB health check (returns 200 if DB auth works)
const { testConnection } = require('./config/database');
app.get('/db/health', async (_req, res) => {
    try {
        await testConnection();
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
