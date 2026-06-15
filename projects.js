const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const projects = await Project.find(filter).sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: project });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project মুছে ফেলা হয়েছে।' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
