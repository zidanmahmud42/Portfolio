require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Post = require('./models/Post');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Admin.deleteMany({});
  await Admin.create({
    username: 'zidan',
    email: process.env.ADMIN_EMAIL || 'zidan@zidan.bro.bd',
    password: process.env.ADMIN_PASSWORD || 'Admin@2024'
  });
  console.log('Admin created: email =', process.env.ADMIN_EMAIL || 'zidan@zidan.bro.bd');

  await Profile.deleteMany({});
  await Profile.create({
    name: 'Zidan Mahmud',
    taglines: ['Web Developer', 'Ethical Hacker', 'IT Executive', 'RENONX CEO'],
    bio: 'আমি জিদান মাহমুদ — একজন Full-Stack Web Developer, Ethical Hacker এবং RENONX Software Solutions-এর Founder & CEO। ওয়েবসাইট, ওয়েব অ্যাপ্লিকেশন তৈরি এবং সাইবার সিকিউরিটি নিয়ে কাজ করি।',
    email: 'zidan@renonx.pro.bd',
    location: 'Bangladesh',
    stats: { projects: 20, courses: 5, cvesFound: 10, yearsExp: 3 },
    skills: {
      webDev: [
        { name: 'HTML & CSS', percent: 95 },
        { name: 'JavaScript', percent: 88 },
        { name: 'React.js', percent: 85 },
        { name: 'Node.js', percent: 80 }
      ],
      security: [
        { name: 'Penetration Testing', level: 'Advanced' },
        { name: 'Web App Security', level: 'Advanced' },
        { name: 'OWASP Top 10', level: 'Advanced' },
        { name: 'Burp Suite', level: 'Intermediate' },
        { name: 'Kali Linux', level: 'Advanced' }
      ],
      tools: ['Git', 'VS Code', 'Linux', 'MongoDB', 'Docker', 'Nmap', 'Metasploit']
    },
    social: {
      github: 'https://github.com/zidanmahmud',
      linkedin: 'https://linkedin.com/in/zidanmahmud',
      facebook: 'https://facebook.com/zidanmahmud'
    }
  });
  console.log('Profile created');

  await Project.deleteMany({});
  await Project.insertMany([
    { title: 'LifeLine Healthcare Platform', description: 'বাংলাদেশের একটি হেলথকেয়ার প্ল্যাটফর্ম যা রোগী, ডাক্তার ও রক্তদাতাদের সংযুক্ত করে।', techStack: ['React', 'Node.js', 'MongoDB', 'Mapbox'], category: 'web-dev', isFeatured: true, liveUrl: '#', githubUrl: '#' },
    { title: 'RENONX Company Website', description: 'RENONX সফটওয়্যার এজেন্সির অফিসিয়াল সাইট ও LMS প্ল্যাটফর্ম।', techStack: ['React', 'Express', 'MongoDB', 'SSLCommerz'], category: 'web-dev', isFeatured: true, liveUrl: 'https://renonx.pro.bd', githubUrl: '#' },
    { title: 'Web App Pentest Report Tool', description: 'একটি ওয়েব অ্যাপ্লিকেশন যা penetration testing রিপোর্ট সুন্দরভাবে তৈরি করে।', techStack: ['React', 'Node.js', 'PDF Generation'], category: 'security', isFeatured: false, liveUrl: '#', githubUrl: '#' }
  ]);
  console.log('Projects created');

  await Post.deleteMany({});
  await Post.insertMany([
    { title: 'Web Development শুরু করার সম্পূর্ণ গাইড', slug: 'web-dev-complete-guide-' + Date.now(), content: '<p>Web development শেখার জন্য প্রথমে HTML, CSS শিখুন...</p>', category: 'blog', isPublished: true, excerpt: 'Web development শেখার জন্য সম্পূর্ণ রোডম্যাপ।' },
    { title: 'RENONX নতুন সাইবার সিকিউরিটি কোর্স লঞ্চ', slug: 'renonx-cyber-security-course-' + Date.now(), content: '<p>আমরা আনন্দের সাথে জানাচ্ছি যে আমাদের নতুন Ethical Hacking কোর্স...</p>', category: 'event', isPublished: true, excerpt: 'নতুন Ethical Hacking কোর্স সম্পর্কে বিস্তারিত জানুন।' }
  ]);
  console.log('Posts created');

  console.log('\n✅ Seed completed successfully!');
  console.log('Admin Login:', process.env.ADMIN_EMAIL || 'zidan@zidan.bro.bd');
  console.log('Password:', process.env.ADMIN_PASSWORD || 'Admin@2024');
  console.log('⚠️  Please change the password after first login!\n');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
