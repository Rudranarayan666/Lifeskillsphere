require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./controllers/authController');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Mount the auth routes
app.use('/api/auth', authRouter);

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
