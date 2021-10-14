const twilio = require('twilio');
const express = require('express');
const db = require('../config/db');
var app = express()
const tankController = {};
const router = express.Router();
const accountSid = '';
const authToken = '';
const client = new twilio(accountSid, authToken);

tankController.posttanklevel = async (req, res, next) => {
 console.log('inside water leevel api',req.body)
 try {
   const user_id=req.body.user_id;
  const tankid=req.body.tankid;
  const maxlevel = req.body.maxlevel
  const minlevel = req.body.minlevel
  const orderby = req.body.orderby;
  const orderOn = new Date();
  const last_modified_by = req.body.orderby;
  const last_modified_on = new Date();

try{
console.log('in try',db)
  await db.query(
    `INSERT INTO waterlevel(user_id,tankid, maxlevel,minlevel, ordered_on, ordered_by, last_modified_on, last_modified_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
    [
      user_id,
      tankid,
      maxlevel,
      minlevel,
      orderOn,
      orderby,
      last_modified_on,
      last_modified_by,
    
    ],
  );
}
catch(error){
console.log('in catch',error)

}
console.log('after try catch')
 //  ${req.body.order_address}, ${req.body.customer_contact_number}, ${orderOn}, ${orderby}, ${last_modified_on}, ${last_modified_by}, ${req.body.driver_id}, ${req.body.tanker_id
 } catch (ex) {
  console.log('at catch placing')
  console.log(ex);
  const error = {};
  error.message = 'Issue with DB Query';
  error.stack = ex;
  next(error);
}
}
tankController.gettanklevel = async (req, res, next) => {
  try {
    const {rows} = await db.query(`SELECT * FROM waterlevel `);
    console.log('rows', rows);
    res.send(rows);
  } catch (ex) {
    const error = {};
    console.log(ex);
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
 }
tankController.gettanklevelbyid = async (req, res, next) => {
  try {
    const {tankid} = req.params;
    console.log(tankid);
    const {rows} = await db.query(`SELECT * FROM waterlevel INNER JOIN users ON waterlevel.user_id=users.id  WHERE tankid='${tankid}'`);
    console.log('rows', rows);
    res.send(rows);
  } catch (ex) {
    const error = {};
    console.log(ex);
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
 }
 tankController.sendStatus = async (req, res, next) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  const {recipient} = req.query;
  try {
    console.log('in try')
    const message  = await client.messages
      .create({
        body: 'Warning! your Water level is below 20%',
        to: '+92' + recipient,
        from: '',
      });
      console.log('after create')
console.log(message.body);
      console.log('message.body');
      return res.status(200).send({res: 'Done'});
  } catch (ex) {
    console.log('in catch')
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    console.log(error)
    return error;
  }
};
 

 
module.exports = tankController;