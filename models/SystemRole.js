const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const systemRoleSchema = new Schema({
	roleId: String,
});

module.exports = mongoose.model('SystemRole', systemRoleSchema);