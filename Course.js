const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  renonxId: { type: String, required: true, unique: true },
  title: String,
  slug: String,
  thumbnail: String,
  shortDescription: String,
  price: Number,
  originalPrice: Number,
  category: String,
  level: String,
  enrolledCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  isNew: { type: Boolean, default: false },
  renonxUrl: String,
  syncedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
