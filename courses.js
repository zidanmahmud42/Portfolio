const router = require('express').Router();
const Course = require('../models/Course');
const Profile = require('../models/Profile');
const auth = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ syncedAt: -1 });
    res.json({ success: true, data: courses });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/sync', auth, async (req, res) => {
  try {
    const { syncCoursesFromRenonx } = require('../services/courseSync');
    await syncCoursesFromRenonx();
    res.json({ success: true, message: 'কোর্স sync সম্পন্ন হয়েছে।' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/toggle-sync', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne() || new Profile();
    profile.courseSyncEnabled = !profile.courseSyncEnabled;
    await profile.save();
    res.json({ success: true, enabled: profile.courseSyncEnabled });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/bridge-receive', async (req, res) => {
  try {
    const bridgeKey = req.headers['x-bridge-key'];
    if (bridgeKey !== process.env.RENONX_BRIDGE_KEY)
      return res.status(401).json({ success: false, message: 'Invalid bridge key' });
    const { courseId, title, thumbnail, price, slug, description, action } = req.body;
    if (action === 'delete') {
      await Course.findOneAndDelete({ renonxId: courseId });
    } else {
      await Course.findOneAndUpdate(
        { renonxId: courseId },
        { title, thumbnail, price, slug, shortDescription: description, renonxUrl: `${process.env.RENONX_API_URL?.replace('/api', '')}/courses/${slug}`, isNew: action === 'create', syncedAt: new Date() },
        { upsert: true, new: true }
      );
    }
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
