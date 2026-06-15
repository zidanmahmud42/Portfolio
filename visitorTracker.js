const UAParser = require('ua-parser-js');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const Visitor = require('../models/Visitor');

const SKIP_PATHS = ['/api/health', '/api/auth', '/api/analytics', '/favicon.ico'];

module.exports = async (req, res, next) => {
  try {
    if (SKIP_PATHS.some(p => req.path.startsWith(p))) return next();
    if (req.method !== 'GET') return next();

    const ua = new UAParser(req.headers['user-agent']);
    const device = ua.getDevice().type || 'desktop';
    const os = ua.getOS().name || 'Unknown';
    const browser = ua.getBrowser().name || 'Unknown';

    const rawIp = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || '';
    const dailySalt = new Date().toISOString().slice(0, 10);
    const hashedIp = crypto.createHash('sha256').update(rawIp + dailySalt).digest('hex');

    let sessionId = req.headers['x-session-id'] || uuidv4();

    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);
    const existing = await Visitor.findOne({ hashedIp, createdAt: { $gte: thirtyMinAgo } });

    await Visitor.create({
      hashedIp,
      userAgent: req.headers['user-agent']?.slice(0, 200),
      device: device === 'mobile' ? 'mobile' : device === 'tablet' ? 'tablet' : 'desktop',
      os: os.slice(0, 50),
      browser: browser.slice(0, 50),
      referrer: (req.headers.referer || '').slice(0, 200),
      page: req.path.slice(0, 100),
      sessionId,
      isUnique: !existing,
      site: 'portfolio',
      createdAt: new Date()
    });
  } catch (e) {}
  next();
};
