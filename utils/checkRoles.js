module.exports = async (member, roles) => {
	if (member) {
		return member.roles.some((role) => roles.includes(role.id));
	} else {
		return true;
	}
};
