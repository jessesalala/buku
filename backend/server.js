// Sample backend routes for content delivery
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'audio/mpeg') {
      cb(null, 'uploads/audio/');
    } else if (file.mimetype.includes('video')) {
      cb(null, 'uploads/video/');
    } else {
      cb(null, 'uploads/text/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Content upload endpoint
router.post('/upload', upload.single('content'), (req, res) => {
  // Save content metadata to database
  const content = new Content({
    title: req.body.title,
    type: req.file.mimetype.includes('audio') ? 'audio' : 
          req.file.mimetype.includes('video') ? 'video' : 'text',
    path: req.file.path,
    category: req.body.category
  });
  
  content.save()
    .then(() => res.status(201).send('Content uploaded successfully'))
    .catch(err => res.status(500).send(err.message));
});

// Content retrieval endpoint
router.get('/content/:type', (req, res) => {
  Content.find({ type: req.params.type })
    .then(content => res.json(content))
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;

// Sample backend route
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });
    
    res.json(notifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
});