const router = require('express').Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json({ success: true, data: profile });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    Object.assign(profile, req.body);
    profile.updatedAt = new Date();
    await profile.save();
    res.json({ success: true, data: profile });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
