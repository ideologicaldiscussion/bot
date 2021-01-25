const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    paginate = require('mongoose-paginate-v2');

const memberSchema = new Schema({
	memberId: String,
	guildId: String,
	lastPunish: Date,
	lastWarn: Date,
	level: Number,
	points: Number,
});

memberSchema.plugin(paginate);

module.exports = mongoose.model('Member', memberSchema);