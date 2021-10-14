const db = require('../config/db');

const codes = require('../utility/error_codes.json');
const orderController = {};

const twilio = require('twilio');

const accountSid = '';
const authToken = '';

const client = new twilio(accountSid, authToken);
// uses Postgres

orderController.getOrders = async (req, res, next) => {
  try {
    const {rows} = await db.query(
      'SELECT * FROM "orders" ORDER BY ordered_on DESC;',
    );
    console.log('rows', rows);
    res.send(rows);
  } catch (ex) {
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

orderController.placeOrder = async (req, res, next) => {
  try {
    const orderby = req.body.orderby;
    const orderOn = new Date();
    const last_modified_by = req.body.orderby;
    const last_modified_on = new Date();
console.log('inside ordeer placing')
try{
  console.log('in try',db)
    await db.query(
      // `SELECT 1`
      `INSERT INTO orders(order_address, customer_contact_number, ordered_on, ordered_by, last_modified_on, last_modified_by, driver_id, tanker_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
      [
        req.body.order_address,
        req.body.customer_contact_number,
        orderOn,
        orderby,
        last_modified_on,
        last_modified_by,
        req.body.driver_id,
        req.body.tanker_id,
      ],
    );
}

catch{
  console.log('in catch')
 
}
console.log('after try catch')
    console.log('at ordeer placing')
    const message = `New Order has been placed by ${req.body.name} Mobile Number:${req.body.customer_contact_number} at Location:${req.body.order_address} `;
    await client.messages
      .create({
        body: message,
        to: '+92' + req.body.customer_contact_number,
        from: '',
      });

    await client.messages
      .create({
        body: message,
        to: '',
        from: '',
      });

    //  ${req.body.order_address}, ${req.body.customer_contact_number}, ${orderOn}, ${orderby}, ${last_modified_on}, ${last_modified_by}, ${req.body.driver_id}, ${req.body.tanker_id}
    console.log('at ordeer placing')
    res.send(codes.Successfull);
  } catch (ex) {
    console.log('at catch placing')
    console.log(ex);
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

orderController.getOrderByID = async (req, res, next) => {
  try {
    const {id} = req.query;
    console.log(id);
    const {rows} = await db.query(`SELECT * FROM orders WHERE id='${id}'`);
    console.log('rows', rows);
    res.send(rows);
  } catch (ex) {
    const error = {};
    console.log(ex);
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

orderController.putUser = async (req, res, next) => {
  const state = await getOrder(req.body.id);
  console.log(state);

  if (state == 2) {
    res.send(codes.orderAlreadyAccepted);
  } else {
    try {
      const orderby = '00000000-0000-0000-0000-000000000000';
      const orderOn = new Date();
      const last_modified_by = '00000000-0000-0000-0000-000000000000';
      const last_modified_on = new Date();

      await db.query(
        `UPDATE public.orders
        SET order_address=$1,  customer_contact_number=$2, ordered_on=$3, ordered_by=$4, last_modified_on=$5, last_modified_by=$6, driver_id=$7,  tanker_id=$8
        WHERE id='${req.body.id}';`,
        [
          req.body.order_address,
          req.body.customer_contact_number,
          orderOn,
          orderby,
          last_modified_on,
          last_modified_by,
          orderby,
          orderby,
        ],
      );

      res.send(codes.Successfull);
    } catch (ex) {
      console.log(ex);
      const error = {};
      error.message = 'Issue with DB Query';
      error.stack = ex;
      next(error);
    }
  }
};

orderController.changeStatus = async (req, res, next) => {
  try {
    const orderby = '00000000-0000-0000-0000-000000000000';
    const orderOn = new Date();
    const last_modified_by = '00000000-0000-0000-0000-000000000000';
    const last_modified_on = new Date();

    await db.query(
      `UPDATE public.orders
      SET last_modified_on=$1, last_modified_by=$2,status=$3
      WHERE id='${req.body.id}';`,
      [last_modified_on, last_modified_by, req.body.status],
    );

    res.send(codes.Successfull);
  } catch (ex) {
    console.log(ex);
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

const getOrder = async (id) => {
  try {
    const {rows} = await db.query(`SELECT * FROM orders WHERE id='${id}'`);
    console.log('rows', rows);
    const state = rows[0].status;
    console.log(state);
    return state;
  } catch (ex) {
    const error = {};
    console.log(ex);
    // error.message = 'Issue with DB Query';
    // error.stack = ex;
    // next(error);
  }
};

module.exports = orderController;
