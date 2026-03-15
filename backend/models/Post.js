const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {             r
    type: String,
    required: true
  },
  images: [String],
  type: {
    type: String,
    enum: ['story', 'need', 'urgent', 'update'],
    default: 'story'
  },
  urgent: {
    type: Boolean,
    default: false
  },
  neededItems: [String],
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shares: {
    type: Number,
    default: 0
  },
  impact: {
    donationsReceived: Number,
    peopleHelped: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
