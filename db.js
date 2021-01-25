const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on(
	'error',
	console.error.bind(console, 'Error connecting to database:'),
);
connection.once('open', () => {
	console.log('Connected to DB!');
});
