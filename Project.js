const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: String,
  techStack: [String],
  liveUrl: String,
  githubUrl: String,
  category: { type: String, enum: ['web-dev', 'security', 'software', 'other'], default: 'web-dev' },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
