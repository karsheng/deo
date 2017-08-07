// Main starting point of the app
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const compress = require('compression');

mongoose.Promise = global.Promise;

// DB Setup
if (process.env.NODE_ENV === 'production') {
	mongoose.connect('mongodb://heroku_9rj0dww5:t2f7sljkj66vls4rasqgkhat8d@ds115583.mlab.com:15583/heroku_9rj0dww5');
} else if (process.env.NODE_ENV === 'test') {

} else {
	mongoose.connect('mongodb://localhost:deoevents/deoevents');	
}
// App Setup
app.use(morgan('combined')); // morgan is a middleware logging framework 
app.use(bodyParser.json({ type: '*/*' })); // parse all request to json
app.use(cors());
app.use(compress());
router(app);


app.use((err, req, res, next) => {
	res.status(422).send({ error: err.message });
});

module.exports = app;