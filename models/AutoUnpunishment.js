const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const autoUnpunishmentSchema = new Schema({
	memberId: String,
	unpunishAt: Date,
});

module.exports = mongoose.model('AutoUnpunishment', autoUnpunishmentSchema);