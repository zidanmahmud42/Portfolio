// posts.js
const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');
const fetch = require('node-fetch');

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

router.get('/', async (req, res) => {
  try {
    const filter = { isPublished: true };
    if (req.query.category) filter.category = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const posts = await Post.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    const total = await Post.countDocuments(filter);
    res.json({ success: true, data: posts, total, pages: Math.ceil(total / limit) });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, isPublished: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post পাওয়া যায়নি।' });
    res.json({ success: true, data: post });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, thumbnail, isPublished, crossPostToRenonx } = req.body;
    const slug = slugify(title) + '-' + Date.now();
    const post = await Post.create({ title, slug, content, category, thumbnail, isPublished: isPublished || false });
    if (crossPostToRenonx && process.env.RENONX_API_URL) {
      try {
        await fetch(`${process.env.RENONX_API_URL}/api/bridge/post`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Bridge-Key': process.env.RENONX_BRIDGE_KEY },
          body: JSON.stringify({ title, content, category, thumbnail, slug, source: 'portfolio' })
        });
        post.crossPostedToRenonx = true;
        await post.save();
      } catch (e) { console.error('Cross-post failed:', e.message); }
    }
    res.status(201).json({ success: true, data: post });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    res.json({ success: true, data: post });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post মুছে ফেলা হয়েছে।' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
