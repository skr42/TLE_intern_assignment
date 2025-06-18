const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    cfHandle: String,
    currentRating: Number,
    maxRating: Number,
    lastSynced: Date,
    remindersSent: { type: Number, default: 0 },
    emailReminderDisabled: { type: Boolean, default: false },
    contestHistory: Array,
    problemStats: Object
});

module.exports = mongoose.model('Student', studentSchema);
