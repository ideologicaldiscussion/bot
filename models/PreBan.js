const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const preBanSchema = new Schema({
	userId: String,
});

module.exports = mongoose.model('PreBan', preBanSchema);