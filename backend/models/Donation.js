const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,       fvrevregv
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['food', 'clothing', 'money', 'medical', 'other'],
    required: true
  },
  category: {
    type: String,
    enum: ['restaurant', 'individual', 'organization'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'items'
  },
  description: {
    type: String,
    required: true
  },
  images: [String],
  status: {
    type: String,
    enum: ['available', 'reserved', 'collected', 'delivered', 'cancelled'],
    default: 'available'
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pickupTime: {
    from: Date,
    to: Date
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  qrCode: String,
  verification: {
    donorVerified: { type: Boolean, default: false },
    recipientVerified: { type: Boolean, default: false },
    verifiedAt: Date
  },
  impact: {
    peopleFed: Number,
    mealsProvided: Number,
    value: Number
  }
}, {
  timestamps: true
});

// Update donor's total donations when donation is created
donationSchema.post('save', async function() {
  const Donation = this.constructor;
  const totalDonations = await Donation.countDocuments({ donor: this.donor });
  
  await mongoose.model('User').findByIdAndUpdate(this.donor, {
    totalDonations: totalDonations
  });
});

module.exports = mongoose.model('Donation', donationSchema);
