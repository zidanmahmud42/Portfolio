const router = require('express').Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'নাম, ইমেইল ও বার্তা আবশ্যক।' });
    await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'বার্তা পাঠানো হয়েছে। শীঘ্রই যোগাযোগ করা হবে।' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.put('/:id/read', auth, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
