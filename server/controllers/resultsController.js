const express = require('express');
const { Op, fn, col, literal } = require('sequelize');
const jwt = require('jsonwebtoken');
const TestResult = require('../models/TestResult');

const router = express.Router();

const { JWT_SECRET = 'change_me' } = process.env;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function getRange(range, start, end) {
  const now = new Date();
  switch (range) {
    case 'last_30d':
      return { start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), end: now };
    case 'last_90d':
      return { start: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), end: now };
    case 'ytd':
      return { start: new Date(now.getFullYear(), 0, 1), end: now };
    case 'custom':
      return { start: start ? new Date(start) : new Date(0), end: end ? new Date(end) : now };
    default:
      return { start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), end: now };
  }
}

// GET /api/results/summary?testType=...&range=last_30d
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { testType, range = 'last_30d', start, end } = req.query;
    const { start: from, end: to } = getRange(range, start, end);

    const where = { userId, finishedAt: { [Op.between]: [from, to] } };
    if (testType) where.testType = testType;

    const results = await TestResult.findAll({ where, order: [['finishedAt', 'DESC']], limit: 500 });
    if (!results.length) return res.json({ count: 0, avgScore: null, lastScore: null, delta: null, best: null, worst: null });

    const scores = results.map(r => r.score).filter(s => typeof s === 'number');
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const lastScore = results[0].score;
    const prevScore = results[1] ? results[1].score : null;
    const delta = prevScore != null ? lastScore - prevScore : null;
    const best = Math.max(...scores);
    const worst = Math.min(...scores);

    return res.json({ count: results.length, avgScore, lastScore, delta, best, worst });
  } catch (e) {
    return res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// GET /api/results/timeseries?testType=...&interval=day|week|month&range=last_90d
router.get('/timeseries', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { testType, range = 'last_90d', start, end, interval = 'week' } = req.query;
    const { start: from, end: to } = getRange(range, start, end);

    const where = { userId, finishedAt: { [Op.between]: [from, to] } };
    if (testType) where.testType = testType;

    // Simple return of ordered points; frontend can bucket
    const results = await TestResult.findAll({ where, order: [['finishedAt', 'ASC']], attributes: ['finishedAt', 'score', 'percentile'] });
    const series = results.map(r => ({ t: r.finishedAt, score: r.score, percentile: r.percentile }));
    return res.json({ series });
  } catch (e) {
    return res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// GET /api/results/traits?testType=...&compare=prev
router.get('/traits', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { testType, compare } = req.query;
    const where = { userId };
    if (testType) where.testType = testType;

    const latest = await TestResult.findOne({ where, order: [['finishedAt', 'DESC']] });
    if (!latest) return res.json({ latest: null, previous: null });
    let previous = null;
    if (compare === 'prev') {
      previous = await TestResult.findOne({ where: { ...where, id: { [Op.ne]: latest.id } }, order: [['finishedAt', 'DESC']] });
    }
    return res.json({ latest: latest.traits || null, previous: previous?.traits || null });
  } catch (e) {
    return res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// GET /api/results/compare?testType=A&testType=B
router.get('/compare', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const testTypes = Array.isArray(req.query.testType) ? req.query.testType : [req.query.testType].filter(Boolean);
    if (!testTypes.length) return res.status(400).json({ message: 'testType is required (can repeat)' });

    const results = await TestResult.findAll({ where: { userId, testType: { [Op.in]: testTypes } }, order: [['finishedAt', 'DESC']], limit: 200 });
    const byType = {};
    for (const r of results) {
      if (!byType[r.testType]) byType[r.testType] = [];
      byType[r.testType].push({ t: r.finishedAt, score: r.score });
    }
    return res.json({ series: byType });
  } catch (e) {
    return res.status(500).json({ message: 'Server error', error: e.message });
  }
});

module.exports = router;


