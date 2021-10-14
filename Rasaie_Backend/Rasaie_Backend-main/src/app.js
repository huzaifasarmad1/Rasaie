require('dotenv').config();
const express = require('express');
const app = express();
// const session = require('express-session');
const http = require('http');
const server = http.createServer(app);
const errorHandler = require('./middleware/error-handler');
const errorMessage = require('./middleware/error-message');
const accessControls = require('./middleware/access-controls');
const cors = require('cors');
const bodyParser = require('body-parser');
// const redis = require('./config/redis');
const helmet = require('helmet');

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json()); // to support JSON-encoded bodies

// connection to  PG DB

// const  { Client } = require('pg');

// const client = new Client({
//   user: process.env.PGUser,
//   host: process.env.PGHost,
//   database: process.env.PGDatabase,
//   password: process.env.PGPassword,
//   port: process.env.PGPort
// })

// client.connect();

// Mongo DB

// connection to mongoose
// const mongoCon = process.env.mongoCon;

// mongoose.connect(mongoCon, {useNewUrlParser: true, useCreateIndex: true});

// prevents well known security vulnerabilities
app.use(helmet());

// Requiring Routes

const sampleRoutes = require('./routes/sample.routes');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/users.routes');
const tankerRoutes = require('./routes/tanker.routes');
const tankRoutes= require('./routes/tank.routes');
//////

const fs = require('fs');
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  require(__dirname + '/models/' + file);
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).send({
    message: 'Backend server running',
  });
});


app.get('/Register', function (req, res) {
  res.status(200).send({
    message: 'Backend server how running',
  });
});

app.set('port', process.env.PORT || 3000);

app.use(accessControls);
app.use(cors());

// Routes which should handle requests
app.use('/sample', sampleRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/tankers', tankerRoutes);
app.use('/tanklevel', tankRoutes);
app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port', app.get('port'));

process
  .on('unhandledRejection', (reason, p) => {
    console.log('Inside Unhandled Rejection');
    console.error(reason, 'Unhandled Rejection at Promise', p);
    process.exit(1);
  })
  .on('uncaughtException', (err) => {
    console.log('Inside Uncaught Exception');
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
