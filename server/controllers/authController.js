// controllers/authController.js
// Express router implementing registration, login, email verification, and /me with JWT

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { testConnection, sequelize } = require('../config/database');

const router = express.Router();

const {
	JWT_SECRET = 'change_me',
	JWT_EXPIRES_IN = '7d',
	EMAIL_HOST,
	EMAIL_PORT,
	EMAIL_SECURE = 'false',
	EMAIL_USER,
	EMAIL_PASS,
	EMAIL_FROM = 'no-reply@psychometric.test',
	BASE_URL = 'http://localhost:5000',
} = process.env;

const emailSecure = String(EMAIL_SECURE).toLowerCase() === 'true';

// Initialize email transporter
const transporter = nodemailer.createTransport({
	host: EMAIL_HOST,
	port: Number(EMAIL_PORT || 587),
	secure: emailSecure,
	auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
});

if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    console.warn('[email] SMTP env not fully configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS, EMAIL_FROM in server/.env. See server/env.example');
}

// Helper: send verification email (link and/or code)
async function sendVerificationEmail({ to, token, name, code }) {
	const verifyUrl = `${BASE_URL}/api/auth/verify-email/${token}`;
	const mailOptions = {
		from: EMAIL_FROM,
		to,
		subject: 'Verify your email - LifeSkillSphere Platform',
		html: `
			<p>Hi ${name || 'there'},</p>
			<p>Welcome to our LifeSkillSphere platform! You can verify your email using either option below:</p>
			<ol>
				<li>Click the link: <a href="${verifyUrl}">${verifyUrl}</a></li>
				<li>Or enter this 6-digit code in the app: <strong style="font-size:18px; letter-spacing:2px;">${code || ''}</strong></li>
			</ol>
			<p>If you did not create an account, you can ignore this email.</p>
		`,
	};
	return transporter.sendMail(mailOptions);
}

// Helper: generate JWT
function generateToken(payload) {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Middleware: protect route
function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

	if (!token) {
		return res.status(401).json({ message: 'Authorization token missing' });
	}
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		return next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
}

// Ensure DB is connected and models are synced (safe in dev; consider migrations in prod)
(async () => {
    await testConnection();
    // Dev convenience: alter schema to add missing columns
    await sequelize.sync({ alter: true });
})().catch((e) => {
	console.error('Startup sync error:', e.message);
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
	try {
		const { name, email, password, age, section } = req.body;

		if (!name || !email || !password || !age || !section) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const existing = await User.findOne({ where: { email } });
		if (existing) {
			return res.status(409).json({ message: 'Email already in use' });
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const verificationToken = crypto.randomBytes(32).toString('hex');
		const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
		const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

		const user = await User.create({
			name,
			email,
			password: passwordHash,
			age: Number(age),
			section,
			verificationToken,
			verificationCode,
			verificationCodeExpiresAt,
			isVerified: false,
		});

		// fire-and-forget email; don't block response if email fails
		sendVerificationEmail({
			to: user.email,
			token: verificationToken,
			code: verificationCode,
			name: user.name,
		}).catch((err) => console.error('Email error:', err.message));

		return res.status(201).json({
			message: 'Registration successful. Please check your email to verify your account.',
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// POST /api/auth/verify-email-code
router.post('/verify-email-code', async (req, res) => {
	try {
		const { email, code } = req.body;
		if (!email || !code) {
			return res.status(400).json({ message: 'Email and code are required' });
		}
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (user.isVerified) {
			return res.status(200).json({ message: 'Email already verified' });
		}
		if (!user.verificationCode || !user.verificationCodeExpiresAt) {
			return res.status(400).json({ message: 'No verification code found. Please request a new one.' });
		}
		if (new Date(user.verificationCodeExpiresAt).getTime() < Date.now()) {
			return res.status(400).json({ message: 'Verification code has expired' });
		}
		if (String(user.verificationCode) !== String(code)) {
			return res.status(400).json({ message: 'Invalid verification code' });
		}
		user.isVerified = true;
		user.verificationToken = null;
		user.verificationCode = null;
		user.verificationCodeExpiresAt = null;
		await user.save();
		return res.json({ message: 'Email verified successfully' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// POST /api/auth/resend-verification-code
router.post('/resend-verification-code', async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({ message: 'Email is required' });
		}
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (user.isVerified) {
			return res.status(200).json({ message: 'Email already verified' });
		}
		const verificationToken = user.verificationToken || crypto.randomBytes(32).toString('hex');
		const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
		const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
		user.verificationToken = verificationToken;
		user.verificationCode = verificationCode;
		user.verificationCodeExpiresAt = verificationCodeExpiresAt;
		await user.save();

		sendVerificationEmail({
			to: user.email,
			token: verificationToken,
			code: verificationCode,
			name: user.name,
		}).catch((err) => console.error('Email error:', err.message));

		return res.json({ message: 'Verification code resent' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		if (!user.isVerified) {
			return res.status(403).json({ message: 'Please verify your email before logging in' });
		}

		const token = generateToken({
			id: user.id,
			email: user.email,
			name: user.name,
			section: user.section,
		});

		return res.json({
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				age: user.age,
				section: user.section,
				isVerified: user.isVerified,
			},
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// GET /api/auth/verify-email/:token
router.get('/verify-email/:token', async (req, res) => {
	const { token } = req.params;
	if (!token) {
		return res.status(400).json({ message: 'Verification token is required' });
	}

	try {
		const user = await User.findOne({ where: { verificationToken: token } });
		if (!user) {
			return res.status(400).json({ message: 'Invalid or expired verification token' });
		}

		user.isVerified = true;
		user.verificationToken = null;
		await user.save();

		const redirectUrl = `${BASE_URL}/login?verified=1`;
		return res.redirect(302, redirectUrl);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// GET /api/auth/me (Protected)
router.get('/me', authMiddleware, async (req, res) => {
	try {
		const user = await User.findByPk(req.user.id, {
			attributes: ['id', 'name', 'email', 'age', 'section', 'isVerified', 'createdAt', 'updatedAt'],
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.json(user);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error', error: err.message });
	}
});

module.exports = router;



