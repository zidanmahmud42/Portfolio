const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email ও password দিন।' });
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Email বা password ভুল।' });
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
    res.json({ success: true, token, admin: { id: admin._id, email: admin.email, username: admin.username } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/verify', auth, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
