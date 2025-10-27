const express = require('express');
const { getProtectedData, getAllUsers, getMessages } = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getProtectedData);
router.get('/users', protect, getAllUsers);
router.get('/messages', protect, getMessages);

module.exports = router;
