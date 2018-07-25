/* eslint-disable no-process-env */

const name = 'react-boilerplate-mern';
const port = process.env.PORT || 9009;
const connstr = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + name;


module.exports = {

	name,
	port,

	devPort: 9019,

	contentBase: '../',

	mongodb: {
		connstr,

		options: {
			autoReconnect: true,
			reconnectInterval: 5000,
			useNewUrlParser: true
		}
	}

};