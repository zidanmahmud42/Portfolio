const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  hashedIp: String,
  userAgent: String,
  device: { type: String, enum: ['mobile', 'desktop', 'tablet'], default: 'desktop' },
  os: String,
  browser: String,
  referrer: String,
  page: String,
  sessionId: String,
  isUnique: { type: Boolean, default: true },
  site: { type: String, default: 'portfolio' },
  createdAt: { type: Date, default: Date.now, index: true }
});
VisitorSchema.index({ createdAt: 1, site: 1 });
module.exports = mongoose.model('Visitor', VisitorSchema);
