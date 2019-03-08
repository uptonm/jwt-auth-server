const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const app = express();

require('./models/user.model');
require('dotenv').config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true }, err => {
  if (err) return logMessage(err, true);
  return logMessage(`Connected to MongoDB on port ${colors.blue(27017)}`);
});
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./services/auth');

app.use(cors());
// app.use(morgan('dev'));
app.use(pino);
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

app.listen(process.env.PORT || 8080, err => {
  if (err) {
    return logMessage(err, true);
  }
  return logMessage(`Server is listening on port ${colors.blue(process.env.PORT || 8080)}`, false);
});

logMessage = (msg, err) => {
  let d = new Date().toLocaleTimeString();
  if (err) {
    return console.log(`${colors.grey(d)} ❗️ ${colors.red(msg)}`);
  }
  return console.log(`${colors.grey(d)} ✨ ${colors.green(msg)}`);
};
