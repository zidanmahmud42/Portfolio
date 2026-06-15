const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  thumbnail: String,
  category: { type: String, enum: ['blog', 'event', 'update', 'tutorial'], default: 'blog' },
  isPublished: { type: Boolean, default: false },
  crossPostedToRenonx: { type: Boolean, default: false },
  site: { type: String, default: 'portfolio' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PostSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (!this.excerpt && this.content)
    this.excerpt = this.content.replace(/<[^>]+>/g, '').slice(0, 160) + '...';
  next();
});

module.exports = mongoose.model('Post', PostSchema);
