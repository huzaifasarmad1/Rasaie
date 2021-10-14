const db = require('./../config/db');
const sampleController = {};
const Users = require('../models/User.model.js');
// uses Postgres

sampleController.sample = async (req, res, next) => {
  try {
    const {rows} = await db.query('SELECT * FROM "Order"');
    console.log('rows', rows);
    res.send(rows[0]);
  } catch (ex) {
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

sampleController.getAll = async (req, res) => {
  let users;
  try {
    users = await Users.find({});

    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: users,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

sampleController.addSample = async (req, res) => {
  Users.create(req.body, function (err, result) {
    if (err) {
      res.status(500).send(err);
      
    } else {
      var data = {
        code: 200,
        message: 'Data inserted successfully',
        data: result,
      };
      res.status(200).send(data);
    }
  });
};

module.exports = sampleController;
