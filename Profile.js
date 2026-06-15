const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Zidan Mahmud' },
  taglines: { type: [String], default: ['Web Developer', 'Ethical Hacker', 'IT Executive', 'RENONX CEO'] },
  bio: String,
  photo: String,
  email: String,
  phone: String,
  location: { type: String, default: 'Bangladesh' },
  stats: {
    projects: { type: Number, default: 0 },
    courses: { type: Number, default: 0 },
    cvesFound: { type: Number, default: 0 },
    yearsExp: { type: Number, default: 0 }
  },
  skills: {
    webDev: [{ name: String, percent: Number }],
    security: [{ name: String, level: String }],
    tools: [String]
  },
  social: {
    github: String,
    linkedin: String,
    facebook: String,
    hackerone: String,
    bugcrowd: String,
    youtube: String
  },
  renonxUrl: { type: String, default: 'https://renonx.pro.bd' },
  courseSyncEnabled: { type: Boolean, default: true },
  lastCourseSyncAt: Date,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', ProfileSchema);
