const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

require('./models/user.model');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/passport-jwt', { useNewUrlParser: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./services/auth');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/auth.routes');
const secureRoute = require('./routes/secure.routes');

app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

//Handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(8080, () => {
  console.log('Server started');
});
