const fetch = require('node-fetch');
const Course = require('../models/Course');
const Profile = require('../models/Profile');

async function syncCoursesFromRenonx() {
  const profile = await Profile.findOne();
  if (!profile?.courseSyncEnabled) return;
  if (!process.env.RENONX_API_URL || !process.env.RENONX_BRIDGE_KEY) return;

  const res = await fetch(`${process.env.RENONX_API_URL}/api/bridge/courses`, {
    headers: { 'X-Bridge-Key': process.env.RENONX_BRIDGE_KEY }
  });
  if (!res.ok) throw new Error('RENONX API error: ' + res.status);
  const { data } = await res.json();

  for (const c of data) {
    await Course.findOneAndUpdate(
      { renonxId: c._id || c.id },
      {
        title: c.title, slug: c.slug, thumbnail: c.thumbnail,
        shortDescription: c.shortDescription, price: c.price,
        originalPrice: c.originalPrice, category: c.category,
        level: c.level, enrolledCount: c.enrolledCount, rating: c.rating,
        renonxUrl: `${process.env.RENONX_API_URL?.replace('/api', '')}/courses/${c.slug}`,
        isNew: (new Date() - new Date(c.createdAt)) < 7 * 24 * 60 * 60 * 1000,
        syncedAt: new Date()
      },
      { upsert: true }
    );
  }

  if (profile) { profile.lastCourseSyncAt = new Date(); await profile.save(); }
  console.log(`Synced ${data.length} courses from RENONX`);
}

module.exports = { syncCoursesFromRenonx };
