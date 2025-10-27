const User = require('../models/User');
const Message = require('../models/Message');

// @desc    Get all users
// @route   GET /api/data/users
// @access  Private
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

// @desc    Get all messages
// @route   GET /api/data/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find()
      .populate('user', 'name')
      .sort({ createdAt: 1 }); // Sort by oldest first

    const formattedMessages = messages.map(msg => ({
      _id: msg._id,
      userId: msg.user._id,
      userName: msg.user.name,
      message: msg.text,
      timestamp: msg.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: formattedMessages,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};


// @desc    Get some protected data
// @route   GET /api/data
// @access  Private
exports.getProtectedData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: '¡Has accedido a datos protegidos!',
    user: req.user.name
  });
};
